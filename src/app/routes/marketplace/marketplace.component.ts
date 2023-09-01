import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core'
import {
  AbstractCategoryService,
  AbstractMarketplaceService,
  StoreData,
} from '@start9labs/marketplace'
import { map, tap } from 'rxjs/operators'
import { HOSTS } from '../../tokens/hosts'
import { UrlService } from '../../services/url.service'
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { TuiDestroyService } from '@taiga-ui/cdk'
import { Observable } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service'
import { MarketplaceService } from 'src/app/services/marketplace.service'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  providers: [TuiDestroyService],
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
  constructor(
    @Inject(AbstractMarketplaceService)
    private readonly marketplaceService: MarketplaceService,
    @Inject(AbstractCategoryService)
    private readonly categoryService: CategoryService,
  ) {}
  private readonly urlService = inject(UrlService)
  readonly hosts = inject(HOSTS)

  readonly store$: Observable<StoreData> = this.marketplaceService
    .getSelectedStore$()
    .pipe(
      map(({ info, packages }) => {
        const categories = new Set<string>()
        categories.add('all')
        info.categories.forEach(c => categories.add(c))

        return {
          info: {
            ...info,
            categories: Array.from(categories),
          },
          packages,
        }
      }),
    )
  readonly alternative$ = this.urlService.getAlt$()
  readonly category$ = this.categoryService.getCategory$()
  readonly query$ = this.categoryService.getQuery$()
}
