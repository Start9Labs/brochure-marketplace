import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FilterPackagesPipeModule, ItemModule } from '@start9labs/marketplace'
import { MarketplaceComponent } from './marketplace.component'
import { SharedPipesModule } from '@start9labs/shared'
import { MarketplaceSidebarModule } from 'src/app/marketplace-sidebar/marketplace-sidebar.module'

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FilterPackagesPipeModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
    MarketplaceSidebarModule,
    ItemModule,
  ],
  declarations: [MarketplaceComponent],
  exports: [MarketplaceComponent],
})
export class MarketplaceModule {}
