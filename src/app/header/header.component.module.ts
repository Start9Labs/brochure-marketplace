import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedPipesModule } from '@start9labs/shared'
import {
  CategoriesModule,
  PackageModule,
  SearchModule,
  SkeletonModule,
} from '@start9labs/marketplace'

import { HeaderComponent } from './header.component'
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core'
import { TuiActiveZoneModule } from '@taiga-ui/cdk'
import { TuiSidebarModule } from '@taiga-ui/addon-mobile'

@NgModule({
  imports: [
    SkeletonModule,
    CommonModule,
    SharedPipesModule,
    SearchModule,
    CategoriesModule,
    PackageModule,
    TuiActiveZoneModule,
    TuiSidebarModule,
    TuiLoaderModule,
    TuiButtonModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class MarketplaceHeaderModule {}
