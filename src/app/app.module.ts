import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicModule } from '@ionic/angular'
import { TextSpinnerComponentModule } from '@start9labs/shared'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextSpinnerComponentModule,
    IonicModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
