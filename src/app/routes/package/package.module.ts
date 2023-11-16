import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  SharedPipesModule,
  TextSpinnerComponentModule,
} from '@start9labs/shared'

import { PackageComponent } from './package.component'
import { TuiButtonModule } from '@taiga-ui/core'
import {
  AboutModule,
  AdditionalModule,
  DependenciesModule,
  MarketplacePackageHeroComponent,
  MarketplacePackageScreenshotComponent,
  ReleaseNotesModule,
} from '@start9labs/marketplace'
import { MarketplaceMenuModule } from 'src/app/marketplace-menu/marketplace-menu.module'

const routes: Routes = [
  {
    path: '',
    component: PackageComponent,
  },
]

@NgModule({
  declarations: [PackageComponent],
  exports: [PackageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedPipesModule,
    TextSpinnerComponentModule,
    RouterModule,
    DependenciesModule,
    AdditionalModule,
    ReleaseNotesModule,
    TuiButtonModule,
    AboutModule,
    MarketplacePackageScreenshotComponent,
    MarketplacePackageHeroComponent,
    MarketplaceMenuModule,
  ],
})
export class PackageModule {}
