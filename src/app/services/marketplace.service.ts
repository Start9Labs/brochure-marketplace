import { Injectable } from '@angular/core'
import {
  MarketplacePkg,
  StoreData,
  GetPackageRes,
  AbstractMarketplaceService,
} from '@start9labs/marketplace'
import {
  BehaviorSubject,
  combineLatest,
  filter,
  from,
  Observable,
  of,
  shareReplay,
} from 'rxjs'
import { catchError, map, pairwise, startWith, switchMap } from 'rxjs/operators'
import { T } from '@start9labs/start-sdk'
import { Exver } from '@start9labs/shared'
import { ApiService } from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService implements AbstractMarketplaceService {
  private readonly registryUrl$ = new BehaviorSubject<string>('')
  private readonly registry$ = this.getRegistryUrl$().pipe(
    switchMap(url => this.fetchRegistry$(url)),
    shareReplay(1),
  )

  constructor(
    private readonly api: ApiService,
    private readonly exver: Exver,
  ) {}

  getRegistry$() {
    return this.registry$
  }

  getRegistryUrl$() {
    return this.registryUrl$.pipe(
      startWith(''),
      pairwise(),
      filter(([prev, curr]) => prev !== curr && curr !== ''),
      map(([_, curr]) => curr),
    )
  }

  setRegistryUrl(url: string | null) {
    this.registryUrl$.next(url || 'https://registry.start9.com')
  }

  getSelectedRegistry$() {
    return this.registry$.pipe(filter(Boolean))
  }

  getSelectedRegistryWithCategories$() {
    return this.getRegistry$().pipe(
      filter(Boolean),
      map(registry => {
        const { info, packages, url } = registry
        const categories = new Map<string, T.Category>()
        categories.set('all', {
          name: 'All',
          description: {
            short: 'All registry packages',
            long: 'An unfiltered list of all packages available on this registry.',
          },
        })
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
        } as StoreData & { url: string }
      }),
    )
  }

  getPackage$(id: string, flavor: string | null): Observable<MarketplacePkg> {
    return this.getRegistry$().pipe(
      switchMap(registry => {
        if (!registry) return of({} as MarketplacePkg)
        const { packages, url } = registry
        const pkg = packages.find(p => p.id === id && p.flavor === flavor)
        return !!pkg ? of(pkg) : this.fetchPackage$(url, id, flavor)
      }),
    )
  }

  private fetchRegistry$(url: string) {
    return combineLatest([this.fetchInfo$(url), this.fetchPackages$(url)]).pipe(
      map(([info, packages]) => ({ info, packages, url })),
      catchError(e => {
        console.error(e)
        return of(null)
      }),
    )
  }

  fetchInfo$(url: string): Observable<T.RegistryInfo> {
    return from(this.api.getRegistryInfo(url))
  }

  getStatic$(
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
