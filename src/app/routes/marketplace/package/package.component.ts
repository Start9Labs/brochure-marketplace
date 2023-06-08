import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { getPkgId } from '@start9labs/shared'
import { AbstractMarketplaceService } from '@start9labs/marketplace'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { TuiDurationOptions, tuiFadeIn } from '@taiga-ui/core'
import { tuiPure } from '@taiga-ui/cdk'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class PackageComponent {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly marketplaceService: AbstractMarketplaceService,
  ) {}
  readonly pkgId = getPkgId(this.activatedRoute)
  readonly version$ = new BehaviorSubject('*')
  index = 0
  speed = 1000

  readonly pkg$ = this.version$.pipe(
    switchMap(version =>
      this.marketplaceService.getPackage$(this.pkgId, version),
    ),
  )

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly marketplaceService: AbstractMarketplaceService,
  ) {}

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } }
  }
}
