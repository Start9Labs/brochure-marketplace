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
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs'
import { MarketplaceConfig } from '@start9labs/shared'

@Component({
  selector: 'registry-settings',
  templateUrl: './registry-settings.component.html',
  styleUrls: ['./registry-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrySettingsComponent implements OnDestroy {
  loading$ = new BehaviorSubject(false)
  private destroy$ = new Subject<void>()
  private readonly marketplaceService = inject(AbstractMarketplaceService)
  control?: FormControl<StoreIdentity | null>
  readonly marketplace: MarketplaceConfig = {
    start9: 'https://registry.start9.com/',
    community: 'https://community-registry.start9.com/',
  }

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
    private readonly context: TuiDialogContext<StoreIdentity>,
  ) {}

  get data(): StoreIdentity[] {
    return this.context.data!
  }

  getName() {
    return (item: StoreIdentity) => item.name!
  }

  submit() {
    this.loading$.next(true)
    setTimeout(() => {
      this.context.completeWith(this.control?.value!)
      this.loading$.next(false)
    }, 800)
  }

  cancel() {
    setTimeout(() => {
      this.context.$implicit.complete()
    }, 100)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
