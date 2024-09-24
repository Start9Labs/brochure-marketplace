import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { getPkgId } from '@start9labs/shared'
import { filter, map, pairwise, switchMap } from 'rxjs/operators'
import { TuiDurationOptions, tuiFadeIn } from '@taiga-ui/core'
import { UrlService } from 'src/app/services/url.service'
import { tuiPure } from '@taiga-ui/cdk'
import { MarketplaceService } from 'src/app/services/marketplace.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'marketplace-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class PackageComponent {
  private readonly urlService = inject(UrlService)
  private readonly router = inject(Router)
  readonly route_ = inject(ActivatedRoute)
    .queryParamMap.pipe(takeUntilDestroyed())
    .subscribe(params =>
      this.marketplaceService.setRegistryUrl(params.get('registry')),
    )

  readonly pkgId = getPkgId(this.route)
  readonly url$ = this.urlService.getUrl$()
  speed = 1000

  constructor(
    private readonly marketplaceService: MarketplaceService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.queryParamMap
      .pipe(
        pairwise(),
        filter(([prev, curr]) => prev.get('registry') !== curr.get('registry')),
        map(([_, curr]) => curr.get('registry')),
      )
      .subscribe(url =>
        this.marketplaceService.setRegistryUrl(
          url || 'https://registry.start9.com',
        ),
      )
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } }
  }

  readonly pkg$ = this.route.queryParamMap.pipe(
    switchMap(paramMap =>
      this.marketplaceService.getPackage$(
        this.pkgId,
        paramMap.get('flavor') || null,
      ),
    ),
  )

  readonly flavors$ = this.route.queryParamMap.pipe(
    switchMap(paramMap =>
      this.marketplaceService.getRegistry$().pipe(
        filter(Boolean),
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
}
