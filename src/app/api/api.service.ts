import {
  GetPackageRes,
  GetPackagesRes,
  MarketplacePkg,
} from '@start9labs/marketplace'
import { T } from '@start9labs/start-sdk'

export abstract class ApiService {
  abstract getRegistryInfo(registryUrl: string): Promise<T.RegistryInfo>

  abstract getRegistryPackage(
    registryUrl: string,
    id: string,
    versionRange: string | null,
  ): Promise<GetPackageRes>

  abstract getRegistryPackages(registryUrl: string): Promise<GetPackagesRes>

  abstract getStaticProxy(
    pkg: MarketplacePkg,
    path: 'LICENSE.md' | 'instructions.md',
  ): Promise<string>
}
