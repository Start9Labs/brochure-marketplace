import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { getPkgId } from '@start9labs/shared'
import { AbstractMarketplaceService } from '@start9labs/marketplace'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
})
export class PackageComponent {
  readonly version = new BehaviorSubject('*')

  readonly pkg$ = this.version.pipe(
    switchMap(version =>
      this.marketplaceService.getPackage(
        getPkgId(this.activatedRoute),
        version,
      ),
    ),
  )

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly marketplaceService: AbstractMarketplaceService,
  ) {}
}
