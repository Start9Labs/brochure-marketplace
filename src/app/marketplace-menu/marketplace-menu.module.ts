import { NgModule } from '@angular/core'
import { MarketplaceMenuComponent } from './marketplace-menu.component'
import { MenuModule } from '@start9labs/marketplace'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiAppearanceModule, TuiIconModule } from '@taiga-ui/experimental'

@NgModule({
  imports: [MenuModule, TuiButtonModule, TuiIconModule, TuiAppearanceModule],
  exports: [MarketplaceMenuComponent],
  declarations: [MarketplaceMenuComponent],
})
export class MarketplaceMenuModule {}
