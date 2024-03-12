import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/marketplace/marketplace.module').then(
        m => m.MarketplaceModule,
      ),
  },
  {
    path: ':pkgId',
    loadChildren: () =>
      import('./routes/package/package.module').then(m => m.PackageModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
