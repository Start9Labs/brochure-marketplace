import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  Marketplace,
  MarketplacePkg,
  StoreInfo,
} from '@start9labs/marketplace'
import { combineLatest, filter, Observable, of, shareReplay } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  private readonly http = inject(HttpClient)
  private readonly hosts = inject(HOSTS)
  private readonly url$ = inject(UrlService).getUrl$()

  private readonly marketplace$: Observable<Marketplace> = combineLatest(
    Object.keys(this.hosts).reduce(
      (acc, url) => ({
        ...acc,
        [url]: combineLatest({
          info: this.http.get<StoreInfo>(url + 'info'),
          packages: this.http.get<MarketplacePkg[]>(url + 'index'),
        }),
      }),
      {},
    ),
  ).pipe(shareReplay(1))

  getKnownHosts$() {
    return of(this.hosts)
  }

  getSelectedHost$() {
    return this.url$.pipe(
      map(url => {
        const { name, icon } = this.hosts[url]

        return { name, icon, url }
      }),
    )
  }

  getMarketplace$() {
    return this.marketplace$
  }

  getSelectedStore$() {
    return combineLatest({
      url: this.url$,
      marketplace: this.getMarketplace$(),
    }).pipe(map(({ url, marketplace }) => marketplace[url]))
  }

  getPackage$(id: string, version: string) {
    if (version === '*') {
      return this.getSelectedStore$().pipe(
        filter(Boolean),
        map(({ packages }) =>
          packages.find(({ manifest }) => manifest.id === id),
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
