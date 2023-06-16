import { InjectionToken } from '@angular/core'
import { StoreIdentity } from '@start9labs/marketplace'

export const HOSTS = new InjectionToken<StoreIdentity[]>('Marketplace hosts', {
  factory: () => [
    {
      url: 'https://registry.start9.com/',
      name: 'Start9 Registry',
      icon: 'logo_transparent.png',
    },
    {
      url: 'https://community-registry.start9.com/',
      name: 'Community Registry',
      icon: 'community-store.png',
    },
  ],
})
