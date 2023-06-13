import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'
import { HOSTS } from '../tokens/hosts'
import {
  AbstractMarketplaceService,
  StoreData,
  StoreIdentity,
} from '@start9labs/marketplace'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { RegistrySettingsComponent } from '../registry-settings/registry-settings.component'
import { UrlService } from '../services/url.service'
import { TuiDialogService } from '@taiga-ui/core'
import { CategoryService } from '../services/category.service'
import { Observable, Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'marketplace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  private destroy$ = new Subject<void>()
  readonly hosts = inject(HOSTS)
  private readonly urlService = inject(UrlService)
  private readonly marketplaceService = inject(AbstractMarketplaceService)
  private readonly categoryService = inject(CategoryService)
  readonly store$ = this.marketplaceService.getSelectedStoreWithAllCategories$()
  readonly alt$ = this.urlService.getAlt$()
  category: string = ''
  query: string = ''

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {}

  open = false

  ngOnInit() {
    this.categoryService
      .getQuery$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.query = val
      })

    this.categoryService
      .getCategory$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.category = val
      })
  }

  onCategoryChange(category: string): void {
    this.category = category
    this.query = ''
    this.categoryService.resetQuery()
    this.categoryService.changeCategory(category)
  }

  onQueryChange(query: string): void {
    this.query = query
    this.categoryService.setQuery(query)
  }

  changeRegistry() {
    this.dialogs
      .open<StoreIdentity>(
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

  toggleMenu(open: boolean): void {
    this.open = open
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
