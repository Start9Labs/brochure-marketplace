import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    redirectTo: 'marketplace',
    pathMatch: 'full',
    path: '',
  },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./routes/marketplace/marketplace.module').then(
        m => m.MarketplaceModule,
      ),
  },
  {
    path: ':pkgId',
    loadChildren: () =>
      import('./routes/package/package.module').then(
        m => m.MarketplacePackageModule,
      ),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
