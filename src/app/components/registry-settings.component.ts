import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  StoreIconComponentModule,
  MarketplaceRegistryComponent,
} from '@start9labs/marketplace'
import { TuiButton, TuiDialogContext } from '@taiga-ui/core'
import {
  PolymorpheusComponent,
  POLYMORPHEUS_CONTEXT,
} from '@taiga-ui/polymorpheus'
import { map, Subscription, tap } from 'rxjs'
import { LoadingService, MarketplaceConfig } from '@start9labs/shared'
import { CommonModule } from '@angular/common'
import { TuiCell } from '@taiga-ui/layout'
import { MarketplaceService } from '../services/marketplace.service'
import { HOSTS } from '../tokens/hosts'
import { ActivatedRoute, Router } from '@angular/router'
const marketplace = require('../../../config.json')
  .marketplace as MarketplaceConfig

@Component({
  standalone: true,
  template: `
    @if (stores$ | async; as stores) { @for (registry of stores; track $index) {
    <button
      tuiCell
      [disabled]="registry.selected"
      [registry]="registry"
      [marketplace]="marketplaceConfig"
      [style.width]="'-webkit-fill-available'"
      (click)="connect(registry.url)"></button>
    } }
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TuiCell,
    TuiButton,
    MarketplaceRegistryComponent,
    StoreIconComponentModule,
  ],
})
export class MarketplaceRegistryModal {
  private readonly loader = inject(LoadingService)
  private readonly hosts = inject(HOSTS)
  private readonly context = inject<TuiDialogContext>(POLYMORPHEUS_CONTEXT)

  readonly marketplaceConfig = marketplace

  readonly stores$ = this.marketplaceService.getRegistryUrl$().pipe(
    map(url =>
      this.hosts.map(s => ({
        ...s,
        selected: this.sameUrl(s.url, url),
      })),
    ),
  )

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly marketplaceService: MarketplaceService,
  ) {}

  async connect(
    registry: string,
    loader: Subscription = new Subscription(),
  ): Promise<void> {
    loader.add(this.loader.open('Changing Registry...').subscribe())
    setTimeout(() => {
      this.router.navigate(['/'], {
        queryParams: { registry },
      })
      loader.unsubscribe()
      this.context.$implicit.complete()
    }, 800)
  }

  sameUrl(
    u1: string | null | undefined,
    u2: string | null | undefined,
  ): boolean {
    return this.toUrl(u1) === this.toUrl(u2)
  }

  toUrl(text: string | null | undefined): string {
    try {
      const url = new URL(text as string)
      return url.toString()
    } catch {
      return ''
    }
  }
}

export const MARKETPLACE_REGISTRY = new PolymorpheusComponent(
  MarketplaceRegistryModal,
)
