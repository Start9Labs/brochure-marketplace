import { Injectable } from '@angular/core'
import { AbstractMarketplaceService } from '@start9labs/marketplace'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { CATEGORIES, PACKAGES, RELEASE_NOTES } from './mock'
import markdown from 'raw-loader!@start9labs/shared/assets/markdown/md-sample.md'

@Injectable()
export class MarketplaceMockService extends AbstractMarketplaceService {
  getKnownHosts$() {
    return of({})
  }

  getSelectedHost$() {
    return of({ name: 'Start9', url: 'https://marketplace.start9labs.com' })
  }

  getMarketplace$() {
    return of({})
  }

  getSelectedStore$() {
    return this.getSelectedHost$().pipe(
      map(({ name }) => ({
        info: { name, categories: CATEGORIES },
        packages: PACKAGES,
      })),
    )
  }

  getPackage$(id: string, _version: string, _url?: string) {
    return of(PACKAGES.filter(pkg => pkg.manifest.id === id)[0])
  }

  fetchReleaseNotes$(id: string, url?: string) {
    return of(RELEASE_NOTES)
  }

  fetchStatic$(id: string, type: string, url?: string): Observable<string> {
    return markdown
  }
}
