import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedPipesModule } from '@start9labs/shared'

import { PackageComponent } from './package.component'
import { TuiButton, TuiLoader, TuiAppearance, TuiIcon } from '@taiga-ui/core'
import {
  AboutModule,
  AdditionalModule,
  FlavorsComponent,
  MarketplaceDependenciesComponent,
  MarketplacePackageHeroComponent,
  MarketplacePackageScreenshotComponent,
} from '@start9labs/marketplace'

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
    RouterModule,
    MarketplaceDependenciesComponent,
    AdditionalModule,
    TuiButton,
    AboutModule,
    MarketplacePackageScreenshotComponent,
    MarketplacePackageHeroComponent,
    TuiLoader,
    TuiIcon,
    TuiAppearance,
    FlavorsComponent,
  ],
})
export class PackageModule {}
