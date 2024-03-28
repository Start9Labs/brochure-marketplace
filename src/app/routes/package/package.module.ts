import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedPipesModule } from '@start9labs/shared'

import { PackageComponent } from './package.component'
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core'
import {
  AboutModule,
  AdditionalModule,
  MarketplaceDependenciesComponent,
  MarketplacePackageHeroComponent,
  MarketplacePackageScreenshotComponent,
  ReleaseNotesModule,
} from '@start9labs/marketplace'
import { TuiAppearanceModule, TuiIconModule } from '@taiga-ui/experimental'

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
    ReleaseNotesModule,
    TuiButtonModule,
    AboutModule,
    MarketplacePackageScreenshotComponent,
    MarketplacePackageHeroComponent,
    TuiLoaderModule,
    TuiIconModule,
    TuiAppearanceModule,
  ],
})
export class PackageModule {}
