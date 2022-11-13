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

  readonly hosts = inject(HOSTS)
  readonly store$ = inject(AbstractMarketplaceService).getSelectedStore$()
  readonly url$ = this.urlService.getUrl$()
  readonly alternative$ = this.url$.pipe(
    map(current => {
      const urls = Object.keys(this.hosts)
      const url = urls.find(url => url !== current) || current

      return { url, name: this.hosts[url].name }
    }),
  )

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
