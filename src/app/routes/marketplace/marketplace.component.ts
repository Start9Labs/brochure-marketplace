import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core'
import { AbstractMarketplaceService, StoreURL } from '@start9labs/marketplace'
import { map, tap } from 'rxjs/operators'
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
      return storeData
    }),
  )

  readonly selected$ = this.marketplaceService.getSelectedHost$()
  readonly alternative$ = this.urlService
    .getUrl$()
    .pipe(map(current => this.hosts.find(({ url }) => url !== current)))

  category = 'featured'
  query = ''

  onCategoryChange(category: string): void {
    this.category = category
    this.query = ''
  }

  toggle(url: StoreURL) {
    this.urlService.toggle(url)
  }
}
