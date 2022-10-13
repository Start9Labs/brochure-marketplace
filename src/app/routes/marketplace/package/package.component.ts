import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-package',
  template: `Here be package: {{ pkgId }}`,
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent {
  readonly pkgId = this.activatedRoute.snapshot.params['pkgId']

  constructor(private readonly activatedRoute: ActivatedRoute) {}
}
