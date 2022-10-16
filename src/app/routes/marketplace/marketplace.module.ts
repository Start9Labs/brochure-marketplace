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

import { MarketplaceComponent } from './marketplace.component'

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: MarketplaceComponent,
  },
  {
    path: ':pkgId',
    loadChildren: () =>
      import('./package/package.module').then(m => m.MarketplacePackageModule),
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
  declarations: [MarketplaceComponent],
  exports: [MarketplaceComponent],
})
export class MarketplaceModule {}
