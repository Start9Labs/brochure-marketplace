import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core'
import { AbstractMarketplaceService, StoreURL } from '@start9labs/marketplace'
import { map } from 'rxjs/operators'
import { HOSTS } from '../../tokens/hosts'
import { UrlService } from '../../services/url.service'
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger('100ms', [
              animate(
                '300ms ease-in-out',
                style({ opacity: 1, transform: 'none' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class MarketplaceComponent {
  @ViewChild('shinyBox')
  private readonly shinyBox?: ElementRef<HTMLElement>
  private readonly urlService = inject(UrlService)
  private readonly marketplaceService = inject(AbstractMarketplaceService)

  readonly hosts = inject(HOSTS)
  readonly store$ = this.marketplaceService.getSelectedStore$().pipe(
    map(({ info, packages, icon }) => {
      const categories = new Set<string>()
      categories.add('all')
      info.categories.forEach(c => categories.add(c))

      return {
        icon,
        info: {
          ...info,
          categories: Array.from(categories),
        },
        packages,
      }
    }),
  )

  readonly selected$ = this.marketplaceService.getSelectedHost$()
  readonly alternative$ = this.urlService
    .getUrl$()
    .pipe(map(current => this.hosts.find(({ url }) => url !== current)))

  category = 'all'
  query = ''
  open = false

  onCategoryChange(category: string): void {
    this.category = category
    this.query = ''
  }

  toggleMarketplace(url: StoreURL) {
    this.urlService.toggle(url)
  }

  toggle(open: boolean): void {
    this.open = open
  }
  shinyHover(e: any) {
    const { x, y } = this.shinyBox?.nativeElement!.getBoundingClientRect()!
    const rad = Math.atan2(y, x)
    const deg = rad * (180 / Math.PI)
    this.shinyBox?.nativeElement!.style.setProperty(
      '--x',
      (e.clientX - x).toString(),
    )
    this.shinyBox?.nativeElement!.style.setProperty(
      '--y',
      (e.clientY - y).toString(),
    )
    this.shinyBox?.nativeElement!.style.setProperty('--deg', deg.toString())
  }
}
