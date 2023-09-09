import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  SharedPipesModule,
  TextSpinnerComponentModule,
} from '@start9labs/shared'
import { PackageModule } from '@start9labs/marketplace'

import { PackageComponent } from './package.component'
import { MarketplaceSidebarModule } from 'src/app/marketplace-sidebar/marketplace-sidebar.module'

const routes: Routes = [
  {
    path: ':pkgId',
    component: PackageComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TextSpinnerComponentModule,
    SharedPipesModule,
    PackageModule,
    MarketplaceSidebarModule,
  ],
  declarations: [PackageComponent],
  exports: [PackageComponent],
})
export class MarketplacePackageModule {}
