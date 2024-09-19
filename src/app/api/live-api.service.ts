import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import {
  HttpOptions,
  HttpService,
  isRpcError,
  Method,
  RpcError,
  RPCOptions,
} from '@start9labs/shared'
import { T } from '@start9labs/start-sdk'
import {
  GetPackageReq,
  GetPackageRes,
  GetPackagesReq,
  GetPackagesRes,
  MarketplacePkg,
} from '@start9labs/marketplace'
import { blake3 } from '@noble/hashes/blake3'

@Injectable()
export class LiveApiService extends ApiService {
  constructor(private readonly http: HttpService) {
    super()
    ; (window as any).rpcClient = this
  }

  async getRegistryInfo(registryUrl: string): Promise<T.RegistryInfo> {
    return this.registryRequest(registryUrl, {
      method: 'info',
      params: {},
    })
  }

  async getRegistryPackage(
    registryUrl: string,
    id: string,
    versionRange: string | null,
  ): Promise<GetPackageRes> {
    const params: GetPackageReq = {
      id,
      version: versionRange,
      otherVersions: 'short',
    }

    return this.registryRequest<GetPackageRes>(registryUrl, {
      method: 'package.get',
      params,
    })
  }

  async getRegistryPackages(registryUrl: string): Promise<GetPackagesRes> {
    const params: GetPackagesReq = {
      id: null,
      version: null,
      otherVersions: 'short',
    }

    return this.registryRequest<GetPackagesRes>(registryUrl, {
      method: 'package.get',
      params,
    })
  }

  async getStaticProxy(
    pkg: MarketplacePkg,
    path: 'LICENSE.md' | 'instructions.md',
  ): Promise<string> {
    const encodedUrl = encodeURIComponent(pkg.s9pk.url)

    return this.httpRequest({
      method: Method.GET,
      url: `/s9pk/proxy/${encodedUrl}/${path}`,
      params: {
        rootSighash: pkg.s9pk.commitment.rootSighash,
        rootMaxsize: pkg.s9pk.commitment.rootMaxsize,
      },
      responseType: 'text',
    })
  }

  private async registryRequest<T>(
    registryUrl: string,
    options: RPCOptions,
  ): Promise<T> {
    return this.rpcRequest(
      {
        ...options,
        method: `registry.${options.method}`,
        params: { registry: registryUrl, ...options.params },
      },
      registryUrl,
    )
  }

  private async rpcRequest<T>(
    options: RPCOptions,
    urlOverride?: string,
  ): Promise<T> {
    const res = await this.http.rpcRequest<T>(options, urlOverride)
    const body = res.body

    if (isRpcError(body)) {
      throw new RpcError(body.error)
    }
    return body.result
  }

  private async httpRequest<T>(opts: HttpOptions): Promise<T> {
    const res = await this.http.httpRequest<T>(opts)
    if (res.headers.get('Repr-Digest')) {
      // verify
      const digest = res.headers.get('Repr-Digest')!
      let data: Uint8Array
      if (opts.responseType === 'arrayBuffer') {
        data = Buffer.from(res.body as ArrayBuffer)
      } else if (opts.responseType === 'text') {
        data = Buffer.from(res.body as string)
      } else if ((opts.responseType as string) === 'blob') {
        data = Buffer.from(await (res.body as Blob).arrayBuffer())
      } else {
        console.warn(
          `could not verify Repr-Digest for responseType ${
            opts.responseType || 'json'
          }`,
        )
        return res.body
      }
      const computedDigest = Buffer.from(blake3(data)).toString('base64')
      if (`blake3=:${computedDigest}:` === digest) return res.body
      console.debug(computedDigest, digest)
      throw new Error('File digest mismatch.')
    }
    return res.body
  }
}
