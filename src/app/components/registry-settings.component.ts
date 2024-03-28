import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnDestroy,
} from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  AbstractMarketplaceService,
  StoreIconComponentModule,
  StoreIdentity,
} from '@start9labs/marketplace'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiLoaderModule,
} from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs'
import { MarketplaceConfig } from '@start9labs/shared'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit'

@Component({
  selector: 'registry-settings',
  template: `
    <div class="registry-settings">
      <h3>Connect to another registry to explore more services.</h3>
      <tui-select
        *ngIf="control"
        [formControl]="control"
        [stringify]="getName()">
        Options
        <input tuiTextfield placeholder="Select a registry" />
        <ng-template #value let-item>
          <store-icon
            size="24px"
            [url]="item.url"
            [marketplace]="marketplace"></store-icon>
          <span>{{ item.name }}</span>
        </ng-template>
        <ng-template tuiDataList>
          <tui-data-list>
            <button *ngFor="let item of data" tuiOption [value]="item">
              <store-icon
                size="24px"
                [url]="item.url"
                [marketplace]="marketplace"></store-icon>
              <span>{{ item.name }}</span>
            </button>
          </tui-data-list>
        </ng-template>
      </tui-select>
      <div class="action-buttons">
        <button
          tuiButton
          size="l"
          type="button"
          appearance="flat"
          class="tui-form__button"
          (click)="cancel()">
          Cancel
        </button>
        <button
          tuiButton
          size="l"
          type="submit"
          class="tui-form__button"
          [disabled]="!control?.dirty"
          [showLoader]="!!(loading$ | async)"
          (click)="submit()">
          Submit
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .registry-settings {
        display: flex;
        flex-direction: column;
        h3 {
          padding-bottom: 1.25rem;
          font-size: 1rem;
        }
        tui-select {
          padding-bottom: 1.25rem;
        }
      }

      store-icon {
        margin-right: 0.5rem;
      }

      .action-buttons {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLoaderModule,
    StoreIconComponentModule,
  ],
})
export class RegistrySettingsComponent implements OnDestroy {
  loading$ = new BehaviorSubject(false)
  private destroy$ = new Subject<void>()
  private readonly marketplaceService = inject(AbstractMarketplaceService)
  private readonly router = inject(Router)
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
      this.router.navigate(['/'])
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
