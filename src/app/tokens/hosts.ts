import { InjectionToken } from '@angular/core'
import { StoreIdentifier, StoreURL } from '@start9labs/marketplace'

export const HOSTS = new InjectionToken<Record<StoreURL, StoreIdentifier>>(
  'Marketplace hosts',
  {
    factory: () => ({
      'https://marketplace.start9labs.com/api/v1': { name: 'Start9 Registry' },
      'https://community.start9labs.com/api/v1': { name: 'Community Registry' },
    }),
  },
)
