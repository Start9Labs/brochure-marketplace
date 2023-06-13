import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core'
import { AbstractMarketplaceService, StoreData } from '@start9labs/marketplace'
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
import { TuiDestroyService } from '@taiga-ui/cdk'
import { Observable } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  providers: [TuiDestroyService],
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
  private readonly categoryService = inject(CategoryService)

  readonly store$: Observable<StoreData> = this.marketplaceService
    .getSelectedStore$()
    .pipe(
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
  readonly alternative$ = this.urlService.getAlt$()
  readonly category$ = this.categoryService.getCategory$()
  readonly query$ = this.categoryService.getQuery$()

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
