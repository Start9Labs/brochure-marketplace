import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import {
  AbstractCategoryService,
  AbstractMarketplaceService,
} from '@start9labs/marketplace'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MarketplaceService } from './services/marketplace.service'
import { RouteReuseStrategyService } from './services/route-reuse-strategy.service'
import { environment } from '../environments/environment'
import { MarketplaceMockService } from './services/marketplace.mock'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core'
import { RegistrySettingsModule } from './registry-settings/registry-settings.module'
import { CategoryService } from './services/category.service'
import { TextSpinnerComponentModule } from '@start9labs/shared'
import { MarketplaceMenuModule } from './marketplace-menu/marketplace-menu.module'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiThemeNightModule,
    TuiModeModule,
    RegistrySettingsModule,
    TextSpinnerComponentModule,
    MarketplaceMenuModule,
  ],
  providers: [
    {
      provide: AbstractMarketplaceService,
      useClass: environment.production
        ? MarketplaceService
        : MarketplaceMockService,
    },
    { provide: RouteReuseStrategy, useClass: RouteReuseStrategyService },
    {
      provide: AbstractCategoryService,
      useClass: CategoryService,
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
