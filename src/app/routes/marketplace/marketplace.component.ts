import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'
import {
  AbstractCategoryService,
  FilterPackagesPipeModule,
  ItemModule,
} from '@start9labs/marketplace'
import { SharedPipesModule } from '@start9labs/shared'
import { MarketplaceService } from 'src/app/services/marketplace.service'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FilterPackagesPipeModule,
    SharedPipesModule,
    ItemModule,
    RouterLink,
  ],
})
export class MarketplaceComponent {
  private readonly categoryService = inject(AbstractCategoryService)
  private readonly marketplaceService = inject(MarketplaceService)

  readonly route = inject(ActivatedRoute)
    .queryParamMap.pipe(takeUntilDestroyed())
    .subscribe(params =>
      this.marketplaceService.setRegistryUrl(params.get('registry')),
    )

  readonly registry$ = this.marketplaceService.getRegistry$()
  readonly category$ = this.categoryService.getCategory$()
  readonly query$ = this.categoryService.getQuery$()
}
