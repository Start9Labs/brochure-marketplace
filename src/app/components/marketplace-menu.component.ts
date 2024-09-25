import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  TuiButton,
  TuiDialogService,
  TuiAppearance,
  TuiIcon,
} from '@taiga-ui/core'
import { MarketplaceConfig } from '@start9labs/shared'
import { MenuModule } from '@start9labs/marketplace'
import { MARKETPLACE_REGISTRY } from './registry-settings.component'
import { MarketplaceService } from '../services/marketplace.service'
import { AsyncPipe } from '@angular/common'

@Component({
  standalone: true,
  selector: 'marketplace-menu',
  template: `
    <menu [iconConfig]="marketplaceConfig" [registry]="registry$ | async">
      <button
        slot="desktop"
        tuiButton
        type="button"
        appearance="icon"
        iconStart="@tui.repeat"
        class="settings-button"
        (click)="changeRegistry()"></button>
      <a
        slot="mobile"
        (click)="changeRegistry()"
        class="settings-button-mobile">
        <tui-icon tuiAppearance="icon" icon="@tui.repeat"></tui-icon>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuModule, TuiButton, TuiIcon, TuiAppearance, AsyncPipe],
})
export class MarketplaceMenuComponent {
  private readonly dialogs = inject(TuiDialogService)
  readonly marketplaceConfig = require('../../../config.json')
    .marketplace as MarketplaceConfig

  readonly registry$ = inject(MarketplaceService).getRegistry$()

  changeRegistry() {
    this.dialogs
      .open(MARKETPLACE_REGISTRY, {
        label: 'Change Registry',
      })
      .subscribe()
  }
}
