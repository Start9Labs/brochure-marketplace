import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FilterPackagesPipeModule, ItemModule } from '@start9labs/marketplace'
import { MarketplaceComponent } from './marketplace.component'
import { SharedPipesModule } from '@start9labs/shared'
import { TuiLet } from '@taiga-ui/cdk'

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
    ItemModule,
    TuiLet,
  ],
  declarations: [MarketplaceComponent],
  exports: [MarketplaceComponent],
})
export class MarketplaceModule {}
