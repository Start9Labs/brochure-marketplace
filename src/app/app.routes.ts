import { Routes } from '@angular/router'

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/marketplace/marketplace.component').then(
        m => m.MarketplaceComponent,
      ),
  },
  {
    path: ':pkgId',
    loadComponent: () =>
      import('./routes/package/package.component').then(
        m => m.PackageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
]
