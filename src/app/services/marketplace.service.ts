import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  Marketplace,
  MarketplacePkg,
  StoreInfo,
} from '@start9labs/marketplace'
import { combineLatest, filter, Observable, shareReplay, Subject } from 'rxjs'
import { first, map, switchMap, tap } from 'rxjs/operators'

import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  private readonly http = inject(HttpClient)
  private readonly hosts = inject(HOSTS)
  private readonly urlService = inject(UrlService)
  private readonly url$ = this.urlService.getUrl$()

  readonly hosts$ = this.router.events.pipe(
    filter(
      (e: Event | NavigationEnd): e is NavigationEnd =>
        e instanceof NavigationEnd,
    ),
    map(route => {
      // route.url is just the path after route param, so this is a hack to create a proper URL
      const params = new URL(`https://test.com${route.url}`).searchParams
      // full path needed for registry
      const url = `https://${params.get('api')}/package/v0/`
      const name = params.get('name')
      if (url && name) {
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
  )

  private readonly marketplace$: Observable<Marketplace> = this.hosts$
    .pipe(
      switchMap(hosts =>
        combineLatest(
          hosts.reduce(
            (acc, { url }) => ({
              ...acc,
              [url]: combineLatest({
                info: this.http.get<StoreInfo>(url + 'info'),
                packages: this.http.get<MarketplacePkg[]>(
                  `${url}index?per-page=100&page=1`,
                ),
              }),
            }),
            {},
          ),
        ),
      ),
      first(),
    )
    .pipe(shareReplay(1))

  constructor(private router: Router) {
    super()
  }

  getKnownHosts$() {
    return this.hosts$
  }

  getSelectedHost$() {
    return combineLatest([this.url$, this.hosts$]).pipe(
      map(([url, hosts]) => hosts.find(host => host.url === url)),
      filter(Boolean),
    )
  }

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

  getPackage$(id: string, version: string) {
    if (version === '*') {
      return this.getSelectedStore$().pipe(
        map(
          ({ packages }) =>
            packages.find(({ manifest }) => manifest.id === id) ||
            ({} as MarketplacePkg),
        ),
      )
    }

    return this.url$.pipe(
      switchMap(url =>
        this.http.get<MarketplacePkg[]>(url + 'index', {
          params: {
            ids: JSON.stringify([{ id, version }]),
          },
        }),
      ),
      map(([pkg]) => pkg),
    )
  }

  fetchReleaseNotes$(id: string) {
    return this.url$.pipe(
      switchMap(url =>
        this.http.get<Record<string, string>>(`${url}release-notes/${id}`),
      ),
    )
  }

  fetchStatic$(id: string, type: string) {
    return this.url$.pipe(
      switchMap(url =>
        this.http.get(`${url}${type}/${id}`, { responseType: 'text' }),
      ),
    )
  }
}

@Injectable({ providedIn: 'root' })
class QueryParams extends Observable<Params> {
  constructor({ queryParams }: ActivatedRoute) {
    super(subscriber => queryParams.subscribe(subscriber))
  }
}
