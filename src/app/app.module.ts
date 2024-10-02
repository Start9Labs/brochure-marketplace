import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { AbstractCategoryService } from '@start9labs/marketplace'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
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
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins'
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
    NG_EVENT_PLUGINS,
    {
      provide: RELATIVE_URL,
      useValue: `/rpc/v0`,
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
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
