import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import {
  CategoriesModule,
  FilterPackagesPipeModule,
  ItemModule,
  SearchModule,
  SkeletonModule,
} from '@start9labs/marketplace'

import { PackageComponent } from './package/package.component'
import { MarketplaceComponent } from './marketplace.component'

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: MarketplaceComponent,
  },
  {
    path: ':pkgId',
    component: PackageComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SkeletonModule,
    ItemModule,
    CategoriesModule,
    FilterPackagesPipeModule,
    SearchModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MarketplaceComponent, PackageComponent],
  exports: [MarketplaceComponent, PackageComponent],
})
export class MarketplaceModule {}
