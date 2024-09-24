import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core'
import { AbstractCategoryService, StoreData } from '@start9labs/marketplace'
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
import { ActivatedRoute } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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
  private readonly urlService = inject(UrlService)
  readonly hosts = inject(HOSTS)
  readonly route = inject(ActivatedRoute)
    .queryParamMap.pipe(takeUntilDestroyed())
    .subscribe(params =>
      this.marketplaceService.setRegistryUrl(params.get('registry')),
    )

  constructor(
    private readonly marketplaceService: MarketplaceService,
    @Inject(AbstractCategoryService)
    private readonly categoryService: CategoryService,
  ) {}

  readonly registry$: Observable<StoreData> = this.marketplaceService
    .getRegistry$()
    .pipe(
      map(registry => {
        if (!registry) return {} as StoreData
        const { info, packages } = registry
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
