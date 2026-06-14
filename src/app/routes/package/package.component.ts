import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import {
  AboutModule,
  AdditionalModule,
  FlavorsComponent,
  MarketplaceDependenciesComponent,
  MarketplacePackageHeroComponent,
  MarketplacePackageScreenshotComponent,
  MarketplacePkg,
} from '@start9labs/marketplace'
import {
  getPkgId,
  MarkdownComponent,
  SharedPipesModule,
} from '@start9labs/shared'
import {
  TuiAppearance,
  TuiDialogService,
  TuiIcon,
  TuiLoader,
} from '@taiga-ui/core'
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus'
import { filter, map, switchMap } from 'rxjs/operators'
import { MarketplaceService } from 'src/app/services/marketplace.service'

@Component({
  selector: 'marketplace-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SharedPipesModule,
    RouterModule,
    MarketplaceDependenciesComponent,
    AdditionalModule,
    AboutModule,
    MarketplacePackageScreenshotComponent,
    MarketplacePackageHeroComponent,
    TuiLoader,
    TuiIcon,
    TuiAppearance,
    FlavorsComponent,
  ],
})
export class PackageComponent {
  private readonly dialogs = inject(TuiDialogService)
  private readonly router = inject(Router)
  readonly pkgId = getPkgId(this.route)

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
