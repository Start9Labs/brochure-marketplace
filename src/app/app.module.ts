import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import {
  AbstractCategoryService,
  AbstractMarketplaceService,
} from '@start9labs/marketplace'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MarketplaceService } from './services/marketplace.service'
import { RouteReuseStrategyService } from './services/route-reuse-strategy.service'
import { environment } from '../environments/environment'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CategoryService } from './services/category.service'
import { MarketplaceMenuComponent } from './components/marketplace-menu.component'
import { CommonModule } from '@angular/common'
import { ScrollerDirective } from './scroller.directive'
import { ApiService } from './api/api.service'
import { LiveApiService } from './api/live-api.service'
import { MockApiService } from './api/mock-api.service'
import { TuiRoot } from '@taiga-ui/core'
import { RELATIVE_URL } from '@start9labs/shared'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MarketplaceMenuComponent,
    ScrollerDirective,
    TuiRoot,
  ],
  providers: [
    {
      provide: AbstractMarketplaceService,
      useClass: MarketplaceService,
    },
    {
      provide: ApiService,
      useClass: environment.production ? LiveApiService : MockApiService,
    },
    { provide: RouteReuseStrategy, useClass: RouteReuseStrategyService },
    {
      provide: AbstractCategoryService,
      useClass: CategoryService,
    },
    {
      provide: RELATIVE_URL,
      useValue: `/rpc/v0`,
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
