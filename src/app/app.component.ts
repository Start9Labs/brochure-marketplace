import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TuiRoot } from '@taiga-ui/core'
import { MarketplaceMenuComponent } from 'src/app/components/marketplace-menu.component'
import { ScrollerDirective } from 'src/app/scroller.directive'

@Component({
  selector: 'app-root',
  template: `
    <tui-root tuiTheme="dark" appScroller>
      <marketplace-menu></marketplace-menu>
      <div class="main-content">
        <router-outlet #o="outlet"></router-outlet>
      </div>
    </tui-root>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarketplaceMenuComponent, ScrollerDirective, TuiRoot, RouterOutlet],
})
export class AppComponent {}
