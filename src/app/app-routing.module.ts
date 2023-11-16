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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
