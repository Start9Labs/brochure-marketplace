import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  Marketplace,
  MarketplacePkg,
  StoreIdentity,
  StoreInfo,
} from '@start9labs/marketplace'
import { combineLatest, filter, Observable, shareReplay } from 'rxjs'
import {
  distinctUntilChanged,
  first,
  map,
  switchMap,
  tap,
} from 'rxjs/operators'

import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'
import { ActivatedRoute, Params } from '@angular/router'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  private readonly http = inject(HttpClient)
  private readonly hosts = inject(HOSTS)
  private readonly url$ = inject(UrlService).getUrl$()
  private readonly params$ = inject(QueryParams)

  private readonly hosts$ = this.params$.pipe(
    tap(params => console.error(params)), // always empty
    map(params => {
      const registry = params['api']
      const name = params['name']
      if (registry && name) {
        return [
          {
            url: `https://${registry}/package/v0/`,
            name,
          },
        ] as StoreIdentity[]
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
