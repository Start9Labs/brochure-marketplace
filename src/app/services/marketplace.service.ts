import { inject, Injectable } from '@angular/core'
import {
  AbstractMarketplaceService,
  Marketplace,
} from '@start9labs/marketplace'
import { combineLatest, of, shareReplay } from 'rxjs'
import { map } from 'rxjs/operators'
import { HOSTS } from '../tokens/hosts'
import { UrlService } from './url.service'

@Injectable()
export class MarketplaceService extends AbstractMarketplaceService {
  private readonly hosts = inject(HOSTS)
  private readonly url$ = inject(UrlService).getUrl$()

  // TODO: Implement
  private readonly marketplace$ = of<Marketplace>({}).pipe(shareReplay(1))

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

  // TODO: Implement
  getPackage$(id: string, version: string, url?: string) {
    return of(undefined)
  }

  // TODO: Implement
  fetchReleaseNotes$(id: string, url?: string) {
    return of({})
  }

  // TODO: Implement
  fetchStatic$(id: string, type: string, url?: string) {
    return of('')
  }
}
