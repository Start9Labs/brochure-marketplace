import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
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
import { TuiCarouselModule } from '@taiga-ui/kit'
import { TuiButtonModule } from '@taiga-ui/core'
import { IonicModule } from '@ionic/angular'

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
    TuiCarouselModule,
    TuiButtonModule,
  ],
  declarations: [PackageComponent, NotesComponent],
  exports: [PackageComponent],
})
export class MarketplacePackageModule {}
