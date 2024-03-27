import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { getPkgId } from '@start9labs/shared'
import { AbstractMarketplaceService } from '@start9labs/marketplace'
import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { TuiDurationOptions, tuiFadeIn } from '@taiga-ui/core'
import { UrlService } from 'src/app/services/url.service'
import { tuiPure } from '@taiga-ui/cdk'

@Component({
  selector: 'marketplace-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class PackageComponent {
  constructor(
    private readonly marketplaceService: AbstractMarketplaceService,
    private readonly route: ActivatedRoute,
  ) {}
  private readonly urlService = inject(UrlService)
  private readonly router = inject(Router)
  readonly version$ = new BehaviorSubject<string>('*')
  readonly pkgId = getPkgId(this.route)
  readonly url$ = this.urlService.getUrl$().pipe(map(x => x))
  speed = 1000

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } }
  }

  readonly pkg$ = this.version$.pipe(
    switchMap(version =>
      this.url$.pipe(
        switchMap(url => {
          return this.marketplaceService.getPackage$(this.pkgId, version, url)
        }),
      ),
    ),
  )

  open(id: string) {
    this.router.navigate(['/', id])
  }
}
