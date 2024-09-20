import { inject, Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  MarketplacePkg,
  StoreData,
  GetPackageRes,
  StoreIdentity,
} from '@start9labs/marketplace'
import { combineLatest, filter, from, Observable, of, shareReplay } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
  scan,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'
import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'
import { Event, NavigationEnd, Router } from '@angular/router'
import { T } from '@start9labs/start-sdk'
import { Exver } from '@start9labs/shared'
import { ApiService } from '../api/api.service'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  constructor(
    private router: Router,
    private readonly api: ApiService,
    private readonly exver: Exver,
  ) {
    super()
  }
  private readonly hosts = inject(HOSTS)
  private readonly urlService = inject(UrlService)
  private readonly url$ = this.urlService.getUrl$()

  readonly hosts$: Observable<StoreIdentity[]> = this.router.events.pipe(
    filter(
      (e: Event | NavigationEnd): e is NavigationEnd =>
        e instanceof NavigationEnd,
    ),
    map(route => {
      // route.url is just information after the origin, so this is a hack to create a proper URL
      const params = new URL(`https://test.com${route.url}`).searchParams
      // full path needed for registry
      const url = `https://${params.get('api')}/`
      const name = params.get('name')

      if (name) {
        this.urlService.toggle(url)
        return [
          ...this.hosts,
          {
            url,
            name,
          },
        ]
      } else {
        return this.hosts
      }
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  getKnownHosts$() {
    return this.hosts$
  }

  getSelectedHost$() {
    return combineLatest([this.url$, this.hosts$]).pipe(
      map(([url, hosts]) => hosts.find(host => host.url === url)),
      filter(Boolean),
    )
  }

  private readonly marketplace$ = this.hosts$.pipe(
    mergeMap(hosts => hosts),
    mergeMap(({ url }) =>
      this.fetchStore$(url).pipe(
        map<StoreData | null, [string, StoreData | null]>(data => [url, data]),
        startWith<[string, StoreData | null]>([url, null]),
      ),
    ),
    scan<[string, StoreData | null], Record<string, StoreData | null>>(
      (requests, [url, store]) => {
        requests[url] = store

        return requests
      },
      {},
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  getMarketplace$() {
    return this.marketplace$
  }

  getSelectedStore$() {
    return combineLatest({
      url: this.url$,
      marketplace: this.getMarketplace$(),
    }).pipe(
      map(({ url, marketplace }) => marketplace[url]),
      filter(Boolean),
    )
  }

  getSelectedStoreWithCategories$() {
    return this.getSelectedHost$().pipe(
      switchMap(({ url }) =>
        this.marketplace$.pipe(
          map(m => m[url]),
          filter(Boolean),
          map(({ info, packages }) => {
            const categories = new Map<string, T.Category>()
            categories.set('all', {
              name: 'All',
              description: {
                short: 'All registry packages',
                long: 'An unfiltered list of all packages available on this registry.',
              },
            })
            if (info.categories['featured']) {
              categories.set('featured', {
                name: 'Featured',
                description: {
                  short: 'Featured packages',
                  long: 'A list of featured packages on this registry.',
                },
              })
            }
            Object.keys(info.categories).forEach(c =>
              categories.set(c, info.categories[c]),
            )
            return {
              url,
              info: {
                ...info,
                categories: Object.fromEntries(categories),
              },
              packages,
            }
          }),
        ),
      ),
    )
  }

  getPackage$(
    id: string,
    _version: string | null,
    flavor: string | null,
  ): Observable<MarketplacePkg> {
    return this.getSelectedStore$().pipe(
      switchMap(({ packages }) =>
        this.url$.pipe(
          switchMap(url => {
            const pkg = packages.find(p => p.id === id && p.flavor === flavor)
            return !!pkg ? of(pkg) : this.fetchPackage$(url, id, flavor)
          }),
        ),
      ),
    )
  }

  private fetchStore$(url: string): Observable<StoreData | null> {
    return combineLatest([this.fetchInfo$(url), this.fetchPackages$(url)]).pipe(
      map(([info, packages]) => ({ info, packages })),
      catchError(e => {
        console.error(e)
        return of(null)
      }),
    )
  }

  fetchInfo$(url: string): Observable<T.RegistryInfo> {
    return from(this.api.getRegistryInfo(url))
  }

  fetchStatic$(
    pkg: MarketplacePkg,
    type: 'LICENSE.md' | 'instructions.md',
  ): Observable<string> {
    return from(this.api.getStaticProxy(pkg, type))
  }

  private fetchPackage$(
    url: string,
    id: string,
    flavor: string | null,
  ): Observable<MarketplacePkg> {
    return from(this.api.getRegistryPackage(url, id)).pipe(
      map(pkgInfo => this.convertToMarketplacePkg(id, flavor, pkgInfo)),
    )
  }

  private fetchPackages$(url: string): Observable<MarketplacePkg[]> {
    return from(this.api.getRegistryPackages(url)).pipe(
      map(packages => {
        return Object.entries(packages).flatMap(([id, pkgInfo]) =>
          Object.keys(pkgInfo.best).map(version =>
            this.convertToMarketplacePkg(
              id,
              this.exver.getFlavor(version),
              pkgInfo,
            ),
          ),
        )
      }),
    )
  }

  convertToMarketplacePkg(
    id: string,
    flavor: string | null,
    pkgInfo: GetPackageRes,
  ): MarketplacePkg {
    const version = Object.keys(pkgInfo.best).find(
      v => this.exver.getFlavor(v) === flavor,
    )!
    return {
      id,
      version,
      flavor,
      ...pkgInfo,
      ...pkgInfo.best[version],
    }
  }
}
