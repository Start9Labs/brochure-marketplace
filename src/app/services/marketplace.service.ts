import { Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  MarketplaceInfo,
  MarketplacePkg,
} from '@start9labs/marketplace'
import { Observable, of } from 'rxjs'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  fetchPackageMarkdown(
    id: string,
    type: string,
    url?: string,
  ): Observable<string> {
    return of('')
  }

  fetchReleaseNotes(
    id: string,
    url?: string,
  ): Observable<Record<string, string>> {
    return of({})
  }

  getMarketplaceInfo$(): Observable<MarketplaceInfo> {
    return of({
      name: '',
      categories: [],
    })
  }

  getPackage(
    id: string,
    version: string,
    url?: string,
  ): Observable<MarketplacePkg | undefined> {
    return of(undefined)
  }

  getPackages$(): Observable<MarketplacePkg[]> {
    return of([])
  }
}
