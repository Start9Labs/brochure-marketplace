import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AbstractMarketplaceService, StoreURL } from '@start9labs/marketplace'
import { map } from 'rxjs/operators'
import { HOSTS } from '../../tokens/hosts'
import { UrlService } from '../../services/url.service'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceComponent {
  private readonly urlService = inject(UrlService)
  private readonly marketplaceService = inject(AbstractMarketplaceService)

  readonly hosts = inject(HOSTS)
  readonly store$ = this.marketplaceService.getSelectedStore$().pipe(
    map(storeData => {
      storeData.info.categories.push('all')
      storeData.info.categories.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1))
      return storeData
    }),
  )

  readonly selected$ = this.marketplaceService.getSelectedHost$()
  readonly alternative$ = this.urlService
    .getUrl$()
    .pipe(map(current => this.hosts.find(({ url }) => url !== current)))

  category = 'featured'
  query = ''
  open = false

  onCategoryChange(category: string): void {
    this.category = category
    this.query = ''
  }

  toggleMarketplace(url: StoreURL) {
    this.urlService.toggle(url)
  }

  toggle(open: boolean): void {
    this.open = open
  }
}
