import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnDestroy,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  AbstractMarketplaceService,
  StoreIdentity,
} from '@start9labs/marketplace'
import { TuiDialogContext } from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { UrlService } from '../services/url.service'
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs'

@Component({
  selector: 'registry-settings',
  templateUrl: './registry-settings.component.html',
  styleUrls: ['./registry-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrySettingsComponent implements OnDestroy {
  search: string | null = ''
  loading$ = new BehaviorSubject(false)
  private destroy$ = new Subject<void>()
  private readonly urlService = inject(UrlService)
  private readonly marketplaceService = inject(AbstractMarketplaceService)
  open = false
  control?: any

  ngOnInit() {
    this.marketplaceService
      .getSelectedHost$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.control = new FormControl(val)
      })
  }

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<StoreIdentity[]>,
  ) {}

  get data(): StoreIdentity[] {
    return this.context.data!
  }

  getName() {
    return (item: StoreIdentity) => item.name!
  }

  submit() {
    this.loading$.next(true)
    this.urlService.toggle(this.control.value?.url!)
    this.context.completeWith(this.control.value)
    this.loading$.next(false)
  }

  cancel() {}
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
