import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  FilterPackagesPipeModule,
  SkeletonModule,
  StoreIconComponentModule,
} from '@start9labs/marketplace'
import { MarketplaceComponent } from './marketplace.component'
import { TuiSidebarModule } from '@taiga-ui/addon-mobile'
import { SharedPipesModule } from '@start9labs/shared'
import { TuiLoaderModule } from '@taiga-ui/core'
import { RegistrySettingsModule } from 'src/app/registry-settings/registry-settings.module'
import { MarketplaceHeaderModule } from 'src/app/header/header.component.module'

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
    SkeletonModule,
    FilterPackagesPipeModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
    RegistrySettingsModule,
    MarketplaceHeaderModule,
  ],
  declarations: [MarketplaceComponent],
  exports: [MarketplaceComponent],
})
export class MarketplaceModule {}
