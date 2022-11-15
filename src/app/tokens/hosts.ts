import { InjectionToken } from '@angular/core'
import { StoreIdentifier, StoreURL } from '@start9labs/marketplace'

export const HOSTS = new InjectionToken<Record<StoreURL, StoreIdentifier>>(
  'Marketplace hosts',
  {
    factory: () => ({
      'https://registry.start9.com/package/v0/': { name: 'Start9 Registry' },
      'https://community-registry.start9.com/package/v0/': {
        name: 'Community Registry',
      },
    }),
  },
)
