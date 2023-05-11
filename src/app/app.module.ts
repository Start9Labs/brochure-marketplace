import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AbstractMarketplaceService } from '@start9labs/marketplace'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MarketplaceService } from './services/marketplace.service'
import { RouteReuseStrategyService } from './services/route-reuse-strategy.service'
import { environment } from '../environments/environment'
import { MarketplaceMockService } from './services/marketplace.mock'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TuiRootModule } from '@taiga-ui/core'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    TuiRootModule,
  ],
  providers: [
    {
      provide: AbstractMarketplaceService,
      useClass: environment.production
        ? MarketplaceService
        : MarketplaceMockService,
    },
    { provide: RouteReuseStrategy, useClass: RouteReuseStrategyService },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
