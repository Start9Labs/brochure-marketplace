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
import { map } from 'rxjs/operators'
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
import { Observable } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service'
import { MarketplaceService } from 'src/app/services/marketplace.service'
import { T } from '@start9labs/start-sdk'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  providers: [],
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
        const categories = new Map<string, T.Category>()
        categories.set('all', {
          name: 'All',
          description: {
            short: 'All registry packages',
            long: 'An unfiltered list of all packages available on this registry.',
          },
        })
        Object.keys(info.categories).forEach(c =>
          categories.set(c, info.categories[c]),
        )

        return {
          info: {
            ...info,
            categories: Object.fromEntries(categories),
          },
          packages,
        }
      }),
    )
  readonly alternative$ = this.urlService.getAlt$()
  readonly category$ = this.categoryService.getCategory$()
  readonly query$ = this.categoryService.getQuery$()
}
