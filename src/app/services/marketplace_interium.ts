import { Url } from '@start9labs/shared'

export type StoreURL = string
export type StoreName = string
export interface StoreIdentity {
  url: StoreURL
  name?: StoreName
}
export type Marketplace = Record<StoreURL, StoreData | null>
export interface StoreData {
  info: StoreInfo
  packages: MarketplacePkg[]
}
export interface StoreInfo {
  name: StoreName
  categories: string[]
}
export type StoreIdentityWithData = StoreData & StoreIdentity
export interface MarketplacePkg {
  icon: Url
  license: Url
  screenshots?: string[]
  instructions: Url
  manifest: Manifest
  categories: string[]
  versions: string[]
  'dependency-metadata': {
    [id: string]: DependencyMetadata
  }
  'published-at': string
}
export interface DependencyMetadata {
  title: string
  icon: Url
  hidden: boolean
}
export interface Manifest {
  id: string
  title: string
  version: string
  'git-hash'?: string
  description: {
    short: string
    long: string
  }
  assets: {
    icon: Url
  }
  replaces?: string[]
  'release-notes': string
  license: string
  'wrapper-repo': Url
  'upstream-repo': Url
  'support-site': Url
  'marketing-site': Url
  'donation-url': Url | null
  alerts: {
    install: string | null
    uninstall: string | null
    restore: string | null
    start: string | null
    stop: string | null
  }
  dependencies: Record<string, Dependency>
  'os-version': string
}
export interface Dependency {
  version: string
  requirement:
    | {
        type: 'opt-in'
        how: string
      }
    | {
        type: 'opt-out'
        how: string
      }
    | {
        type: 'required'
      }
  description: string | null
}

export const recursiveToCamel = (item: unknown): unknown => {
  if (Array.isArray(item)) {
    return item.map((el: unknown) => recursiveToCamel(el))
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item
  }
  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(
      ([key, value]: [string, unknown]) => [
        key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, '')),
        recursiveToCamel(value),
      ],
    ),
  )
}
