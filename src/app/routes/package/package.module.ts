import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  SharedPipesModule,
  TextSpinnerComponentModule,
} from '@start9labs/shared'
import {
  AboutModule,
  AdditionalModule,
  DependenciesModule,
  PackageModule,
  ReleaseNotesModule,
} from '@start9labs/marketplace'

import { PackageComponent } from './package.component'
import { TuiCarouselModule } from '@taiga-ui/kit'
import { TuiButtonModule } from '@taiga-ui/core'
import { IonicModule } from '@ionic/angular'
import { MarketplaceSidebarModule } from 'src/app/marketplace-sidebar/marketplace-sidebar.module'

const routes: Routes = [
  {
    path: ':pkgId',
    component: PackageComponent,
  },
]

@NgModule({
  // @TODO cleanup unused
  imports: [
    CommonModule,
    IonicModule,
    TextSpinnerComponentModule,
    SharedPipesModule,
    PackageModule,
    RouterModule.forChild(routes),
    AboutModule,
    DependenciesModule,
    AdditionalModule,
    ReleaseNotesModule,
    TuiCarouselModule,
    TuiButtonModule,
    MarketplaceSidebarModule,
  ],
  declarations: [PackageComponent],
  exports: [PackageComponent],
})
export class MarketplacePackageModule {}
