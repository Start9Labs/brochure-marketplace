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
  StoreIconComponentModule,
} from '@start9labs/marketplace'
import { MarketplaceComponent } from './marketplace.component'
import { TuiActiveZoneModule, TuiFilterPipeModule } from '@taiga-ui/cdk'
import { TuiSidebarModule } from '@taiga-ui/addon-mobile'
import { SharedPipesModule } from '@start9labs/shared'

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
    SharedPipesModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiFilterPipeModule,
  ],
  declarations: [MarketplaceComponent],
  exports: [MarketplaceComponent],
})
export class MarketplaceModule {}
