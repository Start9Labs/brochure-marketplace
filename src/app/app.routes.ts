import { Routes } from '@angular/router'
import path from 'node:path'

export const ROUTES: Routes = [
  {
    // matcher: consumed => ({
    //   consumed,
    //   posParams: consumed.reduce(
    //     (params, param, index) => ({
    //       ...params,
    //       [index ? 'flavor' : 'id']: param,
    //     }),
    //     {},
    //   ),
    // }),
    path: '',
    loadComponent: () =>
      import('./components/main.component').then(m => m.MainComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
]
