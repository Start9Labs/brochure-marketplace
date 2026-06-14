import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, RouterLink } from '@angular/router'
import {
  AbstractCategoryService,
  FilterPackagesPipeModule,
  ItemModule,
  StoreData,
} from '@start9labs/marketplace'
import { SharedPipesModule } from '@start9labs/shared'
import { Observable } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service'
import { MarketplaceService } from 'src/app/services/marketplace.service'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger('100ms', [
              animate(
                '300ms ease-in-out',
                style({ opacity: 1, transform: 'none' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
  imports: [
    CommonModule,
    FilterPackagesPipeModule,
    SharedPipesModule,
    ItemModule,
    RouterLink,
  ],
})
export class MarketplaceComponent {
  private readonly marketplaceService = inject(MarketplaceService)

  readonly route = inject(ActivatedRoute)
    .queryParamMap.pipe(takeUntilDestroyed())
    .subscribe(params =>
      this.marketplaceService.setRegistryUrl(params.get('registry')),
    )

  readonly registry$: Observable<StoreData> =
    this.marketplaceService.getRegistry$()
  readonly category$ = this.categoryService.getCategory$()
  readonly query$ = this.categoryService.getQuery$()

  constructor(
    @Inject(AbstractCategoryService)
    private readonly categoryService: CategoryService,
  ) {}
}
