import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core'
import { AbstractCategoryService, StoreData } from '@start9labs/marketplace'
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Observable } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service'
import { MarketplaceService } from 'src/app/services/marketplace.service'
import { ActivatedRoute } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
