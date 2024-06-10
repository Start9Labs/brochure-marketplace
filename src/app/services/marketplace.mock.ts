import { Injectable, inject } from '@angular/core'
import {
  AbstractMarketplaceService,
  MarketplacePkg,
} from '@start9labs/marketplace'
import { Observable, combineLatest, of } from 'rxjs'
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators'
import { CATEGORIES, PACKAGES, RELEASE_NOTES } from './mock'
import markdown from 'raw-loader!@start9labs/shared/assets/markdown/md-sample.md'
import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'
import { Router } from '@angular/router'
import { recursiveToCamel } from './marketplace_interium'

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
        packages: recursiveToCamel(PACKAGES) as MarketplacePkg[],
      })),
    )
  }

  getSelectedStoreWithCategories$() {
    return this.getSelectedHost$().pipe(
      switchMap(({ url }) =>
        this.getSelectedStore$().pipe(
          map(({ info, packages }) => {
            const categories = new Set<string>()
            if (info.categories.includes('featured')) categories.add('featured')
            categories.add('all')
            info.categories.forEach((c: any) => categories.add(c))
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

  getPackage$(
    id: string,
    _version: string,
    _url?: string,
  ): Observable<MarketplacePkg> {
    return of(
      (recursiveToCamel(PACKAGES) as MarketplacePkg[]).filter(
        pkg => pkg.manifest.id === id,
      )[0] || {},
    )
  }

  fetchReleaseNotes$(id: string, url?: string) {
    return of(RELEASE_NOTES)
  }

  fetchStatic$(id: string, type: string, url?: string): Observable<string> {
    return markdown
  }
}
