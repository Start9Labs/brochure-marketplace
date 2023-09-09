import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { getPkgId } from '@start9labs/shared'
import { AbstractMarketplaceService } from '@start9labs/marketplace'
import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { tuiFadeIn } from '@taiga-ui/core'
import { UrlService } from 'src/app/services/url.service'

@Component({
  selector: 'app-package',
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
  readonly loadVersion$ = new BehaviorSubject<string>('*')
  readonly pkgId = getPkgId(this.route)
  readonly url$ = this.urlService.getUrl$().pipe(map(x => x))

  readonly pkg$ = this.loadVersion$.pipe(
    switchMap(version =>
      this.url$.pipe(
        switchMap(url => {
          return this.marketplaceService.getPackage$(this.pkgId, version, url)
        }),
      ),
    ),
  )
}
