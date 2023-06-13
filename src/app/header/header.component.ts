import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  Output,
} from '@angular/core'
import { HOSTS } from '../tokens/hosts'
import { StoreData, StoreIdentity } from '@start9labs/marketplace'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { RegistrySettingsComponent } from '../registry-settings/registry-settings.component'
import { UrlService } from '../services/url.service'
import { TuiDialogService } from '@taiga-ui/core'

@Component({
  selector: 'marketplace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly hosts = inject(HOSTS)
  private readonly urlService = inject(UrlService)

  @Input()
  store?: StoreData | null

  @Input()
  alt?: StoreIdentity | null

  @Input()
  query = ''

  @Input()
  category = ''

  @Output()
  readonly categoryChange = new EventEmitter<string>()

  @Output()
  readonly queryChange = new EventEmitter<string>()

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {}

  open = false

  onCategoryChange(category: string): void {
    this.category = category
    this.query = ''
    this.categoryChange.emit(category)
  }

  onQueryChange(query: string): void {
    this.query = query
    this.queryChange.emit(query)
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
}
