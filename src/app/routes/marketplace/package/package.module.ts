import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import {
  SharedPipesModule,
  TextSpinnerComponentModule,
} from '@start9labs/shared'
import {
  AboutModule,
  AdditionalModule,
  DependenciesModule,
  PackageModule,
  ReleaseNotesModule,
} from '@start9labs/marketplace'

import { PackageComponent } from './package.component'
import { NotesComponent } from './notes.component'

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: PackageComponent,
  },
  {
    path: 'notes',
    component: NotesComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TextSpinnerComponentModule,
    SharedPipesModule,
    PackageModule,
    RouterModule.forChild(routes),
    AboutModule,
    DependenciesModule,
    AdditionalModule,
    ReleaseNotesModule,
  ],
  declarations: [PackageComponent, NotesComponent],
  exports: [PackageComponent],
})
export class MarketplacePackageModule {}
