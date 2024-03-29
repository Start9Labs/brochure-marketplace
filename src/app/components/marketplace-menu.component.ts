import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core'
import { TuiButtonModule, TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { MarketplaceConfig } from '@start9labs/shared'
import { RegistrySettingsComponent } from './registry-settings.component'
import { HOSTS } from '../tokens/hosts'
import { UrlService } from '../services/url.service'
import { MenuModule } from '@start9labs/marketplace'
import { TuiAppearanceModule, TuiIconModule } from '@taiga-ui/experimental'

@Component({
  selector: 'marketplace-menu',
  template: `
    <menu [iconConfig]="marketplace">
      <button
        slot="desktop"
        tuiButton
        type="button"
        appearance="icon"
        [pseudoFocus]="false"
        icon="tuiIconRepeatLarge"
        class="settings-button"
        (click)="presentModalMarketplaceSettings()"></button>
      <a
        slot="mobile"
        (click)="presentModalMarketplaceSettings()"
        class="settings-button-mobile">
        <tui-icon tuiAppearance="icon" icon="tuiIconRepeatLarge"></tui-icon>
        <span> Change Registry </span>
      </a>
      <a
        slot="store"
        target="_blank"
        rel="noreferrer"
        href="https://store.start9.com"
        class="store-button">
        <span class="store-detail">Get a Start9 Server</span>
      </a>
      <a
        slot="store-mobile"
        target="_blank"
        rel="noreferrer"
        href="https://store.start9.com"
        class="store-button">
        <span class="store-detail">Get a Start9 Server</span>
      </a>
    </menu>
  `,
  styles: [
    `
      ::ng-deep menu {
        margin: 0;
        padding: 0;
      }

      ::ng-deep button {
        background-color: transparent;
        background-image: none;
      }

      .settings-button {
        margin-top: -0.75rem;

        &:hover {
          opacity: 0.7;
        }
      }

      .settings-button-mobile {
        display: flex;
        gap: 0.5rem;
        position: relative;
        padding: 1.25rem;

        &:hover {
          -webkit-text-decoration-line: none;
          text-decoration-line: none;
        }

        span {
          font-size: 1rem;
          line-height: 1.5rem;
          color: rgb(var(--tw-color-zinc-50) / 1);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0.8;
        }
      }

      .store-button {
        padding: 0 !important;
        margin-bottom: 0.6rem;

        @media (max-width: 768px) {
          margin: 0;
          padding: 1.3rem 0 0 0.5rem !important;
        }
      }

      .store-detail {
        border-radius: 80px;
        border: 1px solid rgb(114, 133, 255, 0.7);
        padding: 0.6rem 1rem;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 75ms;
        transition-duration: 300ms;

        @media (max-width: 768px) {
          border: 1px solid rgb(114, 133, 255, 1);
        }

        &:hover {
          border: 1px solid rgb(114, 133, 255, 1);
        }
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuModule, TuiButtonModule, TuiIconModule, TuiAppearanceModule],
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
