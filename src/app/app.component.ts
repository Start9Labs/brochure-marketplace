import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TuiRoot } from '@taiga-ui/core'
import { MarketplaceMenuComponent } from 'src/app/components/marketplace-menu.component'
import { ScrollerDirective } from 'src/app/scroller.directive'
import { slideInAnimation } from './route-animation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
  imports: [MarketplaceMenuComponent, ScrollerDirective, TuiRoot, RouterOutlet],
})
export class AppComponent {}
