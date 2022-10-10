import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, IonicModule.forRoot()],
  bootstrap: [AppComponent],
})
export class AppModule {}
