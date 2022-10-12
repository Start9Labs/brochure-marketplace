import { Component } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  AbstractMarketplaceService,
  MarketplacePkg,
} from '@start9labs/marketplace'

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent {
  readonly marketplace$: Observable<{
    pkgs: MarketplacePkg[]
    categories: Set<string>
  }> = combineLatest([
    this.marketplaceService.getPackages$(),
    this.marketplaceService.getMarketplaceInfo$(),
  ]).pipe(
    map(([pkgs, { categories }]) => ({
      pkgs,
      categories: new Set(categories),
    })),
  )

  category = 'featured'
  query = ''

  constructor(
    private readonly marketplaceService: AbstractMarketplaceService,
  ) {}

  onCategoryChange(category: string): void {
    this.category = category
    this.query = ''
  }
}
