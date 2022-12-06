import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { getPkgId } from '@start9labs/shared'
import { AbstractMarketplaceService } from '@start9labs/marketplace'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent {
  readonly pkgId = getPkgId(this.activatedRoute)
  readonly version$ = new BehaviorSubject('*')

  readonly pkg$ = this.version$.pipe(
    switchMap(version =>
      this.marketplaceService.getPackage$(this.pkgId, version),
    ),
  )

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly marketplaceService: AbstractMarketplaceService,
  ) {}
}
