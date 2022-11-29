import { InjectionToken } from '@angular/core'
import { StoreIdentity } from '@start9labs/marketplace'

export const HOSTS = new InjectionToken<StoreIdentity[]>('Marketplace hosts', {
  factory: () => [
    {
      url: 'https://registry.start9.com/package/v0/',
      name: 'Start9 Registry',
    },
    // TODO: add back when Community Registry is ready
    // {
    //   url: 'https://community-registry.start9.com/package/v0/',
    //   name: 'Community Registry',
    // },
  ],
})
