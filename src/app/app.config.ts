import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
  provideRouter,
  RouteReuseStrategy,
  withInMemoryScrolling,
} from '@angular/router'
import { AbstractCategoryService } from '@start9labs/marketplace'
import { RELATIVE_URL } from '@start9labs/shared'
import { provideEventPlugins } from '@taiga-ui/event-plugins'
import { ApiService } from 'src/app/api/api.service'
import { LiveApiService } from 'src/app/api/live-api.service'
import { MockApiService } from 'src/app/api/mock-api.service'
import { ROUTES } from 'src/app/app.routes'
import { CategoryService } from 'src/app/services/category.service'
import { RouteReuseStrategyService } from 'src/app/services/route-reuse-strategy.service'
import { environment } from 'src/environments/environment'

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideEventPlugins(),
    {
      provide: RELATIVE_URL,
      useValue: `/rpc/v0`,
    },
    {
      provide: ApiService,
      useClass: environment.production ? LiveApiService : MockApiService,
    },
    { provide: RouteReuseStrategy, useClass: RouteReuseStrategyService },
    {
      provide: AbstractCategoryService,
      useClass: CategoryService,
    },
  ],
}
