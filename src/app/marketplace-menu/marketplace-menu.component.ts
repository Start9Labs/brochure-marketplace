import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core'
import { TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { MarketplaceConfig } from '@start9labs/shared'
import { RegistrySettingsComponent } from '../registry-settings/registry-settings.component'
import { HOSTS } from '../tokens/hosts'
import { UrlService } from '../services/url.service'

@Component({
  selector: 'marketplace-menu',
  templateUrl: 'marketplace-menu.component.html',
  styleUrls: ['./marketplace-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceMenuComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {}

  private readonly hosts = inject(HOSTS)
  private readonly urlService = inject(UrlService)
  readonly marketplace: MarketplaceConfig = {
    start9: 'https://registry.start9.com/',
    community: 'https://community-registry.start9.com/',
  }

  async presentModalMarketplaceSettings() {
    this.dialogs
      .open<RegistrySettingsComponent>(
        new PolymorpheusComponent(RegistrySettingsComponent),
        {
          label: 'Change Registry',
          data: this.hosts,
          dismissible: true,
        },
      )
      .subscribe({
        next: data => {
          this.urlService.toggle((data as any).url)
        },
      })
  }
}
