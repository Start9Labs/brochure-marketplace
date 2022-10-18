import { Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  MarketplaceInfo,
  MarketplacePkg,
} from '@start9labs/marketplace'
import { Observable, of } from 'rxjs'
import { CATEGORIES, PACKAGES, RELEASE_NOTES } from './mock'
import markdown from 'raw-loader!@start9labs/shared/assets/markdown/md-sample.md'

@Injectable()
export class MarketplaceMockService extends AbstractMarketplaceService {
  fetchPackageMarkdown(
    id: string,
    type: string,
    url?: string,
  ): Observable<string> {
    return markdown
  }

  fetchReleaseNotes(
    id: string,
    url?: string,
  ): Observable<Record<string, string>> {
    return of(RELEASE_NOTES)
  }

  getMarketplaceInfo$(): Observable<MarketplaceInfo> {
    return of({
      name: '',
      categories: CATEGORIES,
    })
  }

  getPackage(
    id: string,
    version: string,
    url?: string,
  ): Observable<MarketplacePkg | undefined> {
    return of(PACKAGES.filter(pkg => pkg.manifest.id === id)[0])
  }

  getPackages$(): Observable<MarketplacePkg[]> {
    return of(PACKAGES)
  }
}
