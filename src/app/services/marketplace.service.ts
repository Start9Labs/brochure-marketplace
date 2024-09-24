import { Injectable } from '@angular/core'
import {
  MarketplacePkg,
  GetPackageRes,
  AbstractMarketplaceService,
  StoreData,
} from '@start9labs/marketplace'
import {
  combineLatest,
  filter,
  from,
  Observable,
  of,
  ReplaySubject,
} from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators'
import { T } from '@start9labs/start-sdk'
import { Exver } from '@start9labs/shared'
import { ApiService } from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService implements AbstractMarketplaceService {
  private readonly registryUrlSubject$ = new ReplaySubject<string>(1)
  private readonly registryUrl$ = this.registryUrlSubject$.pipe(
    distinctUntilChanged(),
  )
  private readonly registry$ = this.registryUrl$.pipe(
    switchMap(url => this.fetchRegistry$(url)),
    filter(Boolean),
    map(registry => {
      registry.info.categories['all'] = {
        name: 'All',
        description: {
          short: 'All registry packages',
          long: 'An unfiltered list of all packages available on this registry.',
        },
      }
      return registry
    }),
    shareReplay(1),
  )

  constructor(
    private readonly api: ApiService,
    private readonly exver: Exver,
  ) {}

  getRegistry$(): Observable<StoreDataWithUrl> {
    return this.registry$
  }

  getRegistryUrl$() {
    return this.registryUrl$
  }

  setRegistryUrl(url: string | null) {
    this.registryUrlSubject$.next(url || 'https://registry.start9.com')
  }

  getPackage$(id: string, flavor: string | null): Observable<MarketplacePkg> {
    return this.registry$.pipe(
      switchMap(registry => {
        const { packages, url } = registry
        const pkg = packages.find(p => p.id === id && p.flavor === flavor)
        return !!pkg ? of(pkg) : this.fetchPackage$(url, id, flavor)
      }),
    )
  }

  getStatic$(
    pkg: MarketplacePkg,
    type: 'LICENSE.md' | 'instructions.md',
  ): Observable<string> {
    return from(this.api.getStaticProxy(pkg, type))
  }

  // @TODO unused/duplicate. delete when abstract marketplace updated
  getSelectedRegistry$() {
    return this.registry$
  }
  // @TODO unused/duplicate. delete when abstract marketplace updated
  getSelectedRegistryWithCategories$() {
    console.log('HERE')
    return this.registry$
  }

  private fetchRegistry$(url: string) {
    console.log('FETCHING REGISTRY: ', url)
    return combineLatest([this.fetchInfo$(url), this.fetchPackages$(url)]).pipe(
      map(([info, packages]) => ({ info, packages, url })),
      catchError(e => {
        console.error(e)
        return of(null)
      }),
    )
  }

  private fetchInfo$(url: string): Observable<T.RegistryInfo> {
    return from(this.api.getRegistryInfo(url))
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

  private convertToMarketplacePkg(
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

export type StoreDataWithUrl = StoreData & { url: string }
