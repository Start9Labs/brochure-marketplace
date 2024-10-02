import { ChangeDetectionStrategy, Component } from '@angular/core'
import { slideInAnimation } from './route-animation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor() {}
}
