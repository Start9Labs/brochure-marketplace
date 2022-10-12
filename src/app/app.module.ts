import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicModule } from '@ionic/angular'
import { AbstractMarketplaceService } from '@start9labs/marketplace'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MarketplaceService } from './services/marketplace.service'

@NgModule({
  imports: [BrowserModule, AppRoutingModule, IonicModule.forRoot()],
  providers: [
    { provide: AbstractMarketplaceService, useClass: MarketplaceService },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
