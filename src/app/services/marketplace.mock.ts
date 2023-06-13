import { Injectable, inject } from '@angular/core'
import {
  AbstractMarketplaceService,
  MarketplacePkg,
} from '@start9labs/marketplace'
import { Observable, combineLatest, of } from 'rxjs'
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  share,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators'
import { CATEGORIES, PACKAGES, RELEASE_NOTES } from './mock'
import markdown from 'raw-loader!@start9labs/shared/assets/markdown/md-sample.md'
import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'
import { Router } from '@angular/router'

@Injectable()
export class MarketplaceMockService extends AbstractMarketplaceService {
  private readonly hosts = inject(HOSTS)
  private readonly urlService = inject(UrlService)
  private readonly url$ = this.urlService.getUrl$()
  constructor(private router: Router) {
    super()
  }

  readonly hosts$ = this.router.routerState.root.queryParams.pipe(
    distinctUntilChanged(),
    map(() => this.hosts),
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

  getMarketplace$() {
    return of({})
  }

  getSelectedStore$() {
    return this.getSelectedHost$().pipe(
      map(({ name }) => ({
        info: {
          name: name ? name : 'Unknown Registry',
          categories: CATEGORIES,
        },
        packages: PACKAGES,
      })),
    )
  }

  getSelectedStoreWithAllCategories$() {
    return this.getSelectedStore$().pipe(
      map(({ info, packages, icon }) => {
        const categories = new Set<string>()
        categories.add('all')
        info.categories.forEach(c => categories.add(c))

        return {
          icon,
          info: {
            ...info,
            categories: Array.from(categories),
          },
          packages,
        }
      }),
    )
  }

  getPackage$(
    id: string,
    _version: string,
    _url?: string,
  ): Observable<MarketplacePkg> {
    return of(PACKAGES.filter(pkg => pkg.manifest.id === id)[0] || {})
  }

  fetchReleaseNotes$(id: string, url?: string) {
    return of(RELEASE_NOTES)
  }

  fetchStatic$(id: string, type: string, url?: string): Observable<string> {
    return markdown
  }
}
