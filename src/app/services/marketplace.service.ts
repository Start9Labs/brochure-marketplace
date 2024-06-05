import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  Marketplace,
  MarketplacePkg,
  StoreData,
  StoreInfo,
} from '@start9labs/marketplace'
import { combineLatest, filter, Observable, shareReplay } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'

import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'
import { Event, NavigationEnd, Router } from '@angular/router'
import { recursiveToCamel } from './marketplace_interium'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  constructor(private router: Router) {
    super()
  }
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

  private readonly marketplace$: Observable<Marketplace> = this.hosts$
    .pipe(
      switchMap(hosts =>
        combineLatest(
          hosts.reduce(
            (acc, { url }) => ({
              ...acc,
              [url]: combineLatest({
                info: this.http.get<StoreInfo>(url + 'package/v0/info'),
                packages: this.http.get<MarketplacePkg[]>(
                  `${url}package/v0/index?per-page=100&page=1`,
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
      map(m => {
        const p = recursiveToCamel(m.packages)
        return {
          ...m,
          packages: p,
        } as StoreData
      }),
    )
  }

  getSelectedStoreWithCategories$() {
    return this.getSelectedHost$().pipe(
      switchMap(({ url }) =>
        this.marketplace$.pipe(
          map(m => m[url]),
          filter(Boolean),
          map(({ info, packages }) => {
            const categories = new Set<string>()
            categories.add('all')
            if (info.categories.includes('featured')) {
              categories.add('featured')
            }
            info.categories.forEach(c => categories.add(c))
            const p = recursiveToCamel(packages) as MarketplacePkg[]
            return {
              url,
              info: {
                ...info,
                categories: Array.from(categories),
              },
              packages: p,
            }
          }),
        ),
      ),
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
        this.http.get<MarketplacePkg[]>(url + 'package/v0/index', {
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
        this.http.get<Record<string, string>>(
          `${url}package/v0/release-notes/${id}`,
        ),
      ),
    )
  }

  fetchStatic$(id: string, type: string) {
    return this.url$.pipe(
      switchMap(url =>
        this.http.get(`${url}package/v0/${type}/${id}`, {
          responseType: 'text',
        }),
      ),
    )
  }
}
