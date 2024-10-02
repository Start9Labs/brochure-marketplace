import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { getPkgId, MarkdownComponent } from '@start9labs/shared'
import { filter, map, switchMap } from 'rxjs/operators'
import { TuiDialogService, TuiDurationOptions, tuiFadeIn } from '@taiga-ui/core'
import { tuiPure } from '@taiga-ui/cdk'
import { MarketplaceService } from 'src/app/services/marketplace.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus'
import { MarketplacePkg } from '@start9labs/marketplace'

@Component({
  selector: 'marketplace-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class PackageComponent {
  private readonly dialogs = inject(TuiDialogService)
  private readonly router = inject(Router)
  readonly pkgId = getPkgId(this.route)

  speed = 1000

  constructor(
    private readonly marketplaceService: MarketplaceService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe(params =>
        this.marketplaceService.setRegistryUrl(params.get('registry')),
      )
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } }
  }

  readonly pkg$ = this.route.queryParamMap.pipe(
    switchMap(paramMap =>
      this.marketplaceService.getPackage$(this.pkgId, paramMap.get('flavor')),
    ),
  )

  readonly flavors$ = this.route.queryParamMap.pipe(
    switchMap(paramMap =>
      this.marketplaceService.getRegistry$().pipe(
        map(s =>
          s.packages.filter(
            p => p.id === this.pkgId && p.flavor !== paramMap.get('flavor'),
          ),
        ),
        filter(p => !!p.length),
      ),
    ),
  )

  open(id: string) {
    this.router.navigate(['/', id])
  }

  onStatic(label: string, pkg: MarketplacePkg) {
    this.dialogs
      .open(new PolymorpheusComponent(MarkdownComponent), {
        label,
        size: 'l',
        data: {
          content: this.marketplaceService.getStatic$(
            pkg,
            label === 'License' ? 'LICENSE.md' : 'instructions.md',
          ),
        },
      })
      .subscribe()
  }
}
