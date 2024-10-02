import { BTC_ICON, LND_ICON, PROXY_ICON, REGISTRY_ICON } from './api-icons'
import { T } from '@start9labs/start-sdk'
import { GetPackagesRes } from '@start9labs/marketplace'

const mockMerkleArchiveCommitment: T.MerkleArchiveCommitment = {
  rootSighash: 'fakehash',
  rootMaxsize: 0,
}

const mockDescription = {
  short: 'Lorem ipsum dolor sit amet',
  long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export module Mock {
  export const RegistryInfo: T.RegistryInfo = {
    name: 'Start9 Registry',
    icon: REGISTRY_ICON,
    categories: {
      bitcoin: {
        name: 'Bitcoin',
        description: mockDescription,
      },
      featured: {
        name: 'Featured',
        description: mockDescription,
      },
      lightning: {
        name: 'Lightning',
        description: mockDescription,
      },
      communications: {
        name: 'Communications',
        description: mockDescription,
      },
      data: {
        name: 'Data',
        description: mockDescription,
      },
      ai: {
        name: 'AI',
        description: mockDescription,
      },
    },
  }

  export const MockManifestBitcoind: T.Manifest = {
    id: 'bitcoind',
    title: 'Bitcoin Core',
    version: '0.21.0:0',
    satisfies: [],
    canMigrateTo: '!',
    canMigrateFrom: '*',
    gitHash: 'abcdefgh',
    description: {
      short: 'A Bitcoin full node by Bitcoin Core.',
      long: 'Bitcoin is a decentralized consensus protocol and settlement network.',
    },
    releaseNotes: 'Taproot, Schnorr, and more.',
    license: 'MIT',
    wrapperRepo: 'https://github.com/start9labs/bitcoind-wrapper',
    upstreamRepo: 'https://github.com/bitcoin/bitcoin',
    supportSite: 'https://bitcoin.org',
    marketingSite: 'https://bitcoin.org',
    donationUrl: 'https://start9.com',
    alerts: {
      install: 'Bitcoin can take over a week to sync.',
      uninstall:
        'Chain state will be lost, as will any funds stored on your Bitcoin Core waller that have not been backed up.',
      restore: null,
      start: 'Starting Bitcoin is good for your health.',
      stop: null,
    },
    osVersion: '0.2.12',
    dependencies: {},
    hasConfig: true,
    images: {
      main: {
        source: 'packed',
        arch: ['x86_64', 'aarch64'],
        emulateMissingAs: 'aarch64',
      },
    },
    assets: [],
    volumes: ['main'],
    hardwareRequirements: {
      device: {},
      arch: null,
      ram: null,
    },
  }

  export const MockManifestLnd: T.Manifest = {
    id: 'lnd',
    title: 'Lightning Network Daemon',
    version: '0.11.1:0',
    satisfies: [],
    canMigrateTo: '!',
    canMigrateFrom: '*',
    gitHash: 'abcdefgh',
    description: {
      short: 'A bolt spec compliant client.',
      long: 'More info about LND. More info about LND. More info about LND.',
    },
    releaseNotes: 'Dual funded channels!',
    license: 'MIT',
    wrapperRepo: 'https://github.com/start9labs/lnd-wrapper',
    upstreamRepo: 'https://github.com/lightningnetwork/lnd',
    supportSite: 'https://lightning.engineering/',
    marketingSite: 'https://lightning.engineering/',
    donationUrl: null,
    alerts: {
      install: null,
      uninstall: null,
      restore:
        'If this is a duplicate instance of the same LND node, you may loose your funds.',
      start: 'Starting LND is good for your health.',
      stop: null,
    },
    osVersion: '0.2.12',
    dependencies: {
      bitcoind: {
        description: 'LND needs bitcoin to live.',
        optional: true,
        s9pk: '',
      },
      'btc-rpc-proxy': {
        description:
          'As long as Bitcoin is pruned, LND needs Bitcoin Proxy to fetch block over the P2P network.',
        optional: true,
        s9pk: '',
      },
    },
    hasConfig: true,
    images: {
      main: {
        source: 'packed',
        arch: ['x86_64', 'aarch64'],
        emulateMissingAs: 'aarch64',
      },
    },
    assets: [],
    volumes: ['main'],
    hardwareRequirements: {
      device: {},
      arch: null,
      ram: null,
    },
  }

  export const MockManifestBitcoinProxy: T.Manifest = {
    id: 'btc-rpc-proxy',
    title: 'Bitcoin Proxy',
    version: '0.2.2:0',
    satisfies: [],
    canMigrateTo: '!',
    canMigrateFrom: '*',
    gitHash: 'lmnopqrx',
    description: {
      short: 'A super charger for your Bitcoin node.',
      long: 'More info about Bitcoin Proxy. More info about Bitcoin Proxy. More info about Bitcoin Proxy.',
    },
    releaseNotes: 'Even better support for Bitcoin and wallets!',
    license: 'MIT',
    wrapperRepo: 'https://github.com/start9labs/btc-rpc-proxy-wrapper',
    upstreamRepo: 'https://github.com/Kixunil/btc-rpc-proxy',
    supportSite: '',
    marketingSite: '',
    donationUrl: 'https://start9.com',
    alerts: {
      install: 'Testing install alert',
      uninstall: null,
      restore: null,
      start: null,
      stop: null,
    },
    osVersion: '0.2.12',
    dependencies: {
      bitcoind: {
        description: 'Bitcoin Proxy requires a Bitcoin node.',
        optional: false,
        s9pk: '',
      },
    },
    hasConfig: false,
    images: {
      main: {
        source: 'packed',
        arch: ['x86_64', 'aarch64'],
        emulateMissingAs: 'aarch64',
      },
    },
    assets: [],
    volumes: ['main'],
    hardwareRequirements: {
      device: {},
      arch: null,
      ram: null,
    },
  }

  export const OtherPackageVersions: {
    [id: T.PackageId]: GetPackagesRes
  } = {
    bitcoind: {
      '=26.1.0:0.1.0': {
        best: {
          '26.1.0:0.1.0': {
            title: 'Bitcoin Core',
            description: mockDescription,
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/start9labs/bitcoind-startos',
            upstreamRepo: 'https://github.com/bitcoin/bitcoin',
            supportSite: 'https://bitcoin.org',
            marketingSite: 'https://bitcoin.org',
            releaseNotes: 'Even better support for Bitcoin and wallets!',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: BTC_ICON,
            sourceVersion: null,
            dependencyMetadata: {},
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v26.1.0/bitcoind.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
          '#knots:26.1.20240325:0': {
            title: 'Bitcoin Knots',
            description: {
              short: 'An alternate fully verifying implementation of Bitcoin',
              long: 'Bitcoin Knots is a combined Bitcoin node and wallet. Not only is it easy to use, but it also ensures bitcoins you receive are both real bitcoins and really yours.',
            },
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/start9labs/bitcoinknots-startos',
            upstreamRepo: 'https://github.com/bitcoinknots/bitcoin',
            supportSite: 'https://bitcoinknots.org',
            marketingSite: 'https://bitcoinknots.org',
            releaseNotes: 'Even better support for Bitcoin and wallets!',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: BTC_ICON,
            sourceVersion: null,
            dependencyMetadata: {},
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/bitcoinknots-startos/releases/download/v26.1.20240513/bitcoind.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
        },
        categories: ['bitcoin', 'featured'],
        otherVersions: {
          '27.0.0:1.0.0': {
            releaseNotes: 'Even better support for Bitcoin and wallets!',
          },
          '#knots:27.1.0:0': {
            releaseNotes: 'Even better support for Bitcoin and wallets!',
          },
        },
      },
      '=#knots:26.1.20240325:0': {
        best: {
          '26.1.0:0.1.0': {
            title: 'Bitcoin Core',
            description: mockDescription,
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/start9labs/bitcoind-startos',
            upstreamRepo: 'https://github.com/bitcoin/bitcoin',
            supportSite: 'https://bitcoin.org',
            marketingSite: 'https://bitcoin.org',
            releaseNotes: 'Even better support for Bitcoin and wallets!',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: BTC_ICON,
            sourceVersion: null,
            dependencyMetadata: {},
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v26.1.0/bitcoind.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
          '#knots:26.1.20240325:0': {
            title: 'Bitcoin Knots',
            description: {
              short: 'An alternate fully verifying implementation of Bitcoin',
              long: 'Bitcoin Knots is a combined Bitcoin node and wallet. Not only is it easy to use, but it also ensures bitcoins you receive are both real bitcoins and really yours.',
            },
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/start9labs/bitcoinknots-startos',
            upstreamRepo: 'https://github.com/bitcoinknots/bitcoin',
            supportSite: 'https://bitcoinknots.org',
            marketingSite: 'https://bitcoinknots.org',
            releaseNotes: 'Even better support for Bitcoin and wallets!',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: BTC_ICON,
            sourceVersion: null,
            dependencyMetadata: {},
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/bitcoinknots-startos/releases/download/v26.1.20240513/bitcoind.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
        },
        categories: ['bitcoin', 'featured'],
        otherVersions: {
          '27.0.0:1.0.0': {
            releaseNotes: 'Even better support for Bitcoin and wallets!',
          },
          '#knots:27.1.0:0': {
            releaseNotes: 'Even better support for Bitcoin and wallets!',
          },
        },
      },
    },
    lnd: {
      '=0.17.5:0': {
        best: {
          '0.17.5:0': {
            title: 'LND',
            description: mockDescription,
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/start9labs/lnd-startos',
            upstreamRepo: 'https://github.com/lightningnetwork/lnd',
            supportSite: 'https://lightning.engineering/slack.html',
            marketingSite: 'https://lightning.engineering/',
            releaseNotes: 'Upstream release to 0.17.5',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: LND_ICON,
            sourceVersion: null,
            dependencyMetadata: {
              bitcoind: {
                title: 'Bitcoin Core',
                icon: BTC_ICON,
                description: 'Used for RPC requests',
                optional: false,
              },
              'btc-rpc-proxy': {
                title: 'Bitcoin Proxy',
                icon: PROXY_ICON,
                description: 'Used for authorized proxying of RPC requests',
                optional: true,
              },
            },
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/lnd-startos/releases/download/v0.17.5/lnd.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
        },
        categories: ['lightning'],
        otherVersions: {
          '0.18.0:0.0.1': {
            releaseNotes: 'Upstream release and minor fixes.',
          },
          '0.17.4-beta:1.0-alpha': {
            releaseNotes: 'Upstream release to 0.17.4',
          },
        },
      },
      '=0.17.4-beta:1.0-alpha': {
        best: {
          '0.17.4-beta:1.0-alpha': {
            title: 'LND',
            description: mockDescription,
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/start9labs/lnd-startos',
            upstreamRepo: 'https://github.com/lightningnetwork/lnd',
            supportSite: 'https://lightning.engineering/slack.html',
            marketingSite: 'https://lightning.engineering/',
            releaseNotes: 'Upstream release to 0.17.4',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: LND_ICON,
            sourceVersion: null,
            dependencyMetadata: {
              bitcoind: {
                title: 'Bitcoin Core',
                icon: BTC_ICON,
                description: 'Used for RPC requests',
                optional: false,
              },
              'btc-rpc-proxy': {
                title: 'Bitcoin Proxy',
                icon: PROXY_ICON,
                description: 'Used for authorized proxying of RPC requests',
                optional: true,
              },
            },
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/lnd-startos/releases/download/v0.17.4/lnd.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
        },
        categories: ['lightning'],
        otherVersions: {
          '0.18.0:0.0.1': {
            releaseNotes: 'Upstream release and minor fixes.',
          },
          '0.17.5:0': {
            releaseNotes: 'Upstream release to 0.17.5',
          },
        },
      },
    },
    'btc-rpc-proxy': {
      '=0.3.2.6:0': {
        best: {
          '0.3.2.6:0': {
            title: 'Bitcoin Proxy',
            description: mockDescription,
            hardwareRequirements: { arch: null, device: {}, ram: null },
            license: 'mit',
            wrapperRepo: 'https://github.com/Start9Labs/btc-rpc-proxy-wrappers',
            upstreamRepo: 'https://github.com/Kixunil/btc-rpc-proxy',
            supportSite: 'https://github.com/Kixunil/btc-rpc-proxy/issues',
            marketingSite: '',
            releaseNotes: 'Upstream release and minor fixes.',
            osVersion: '0.3.6',
            gitHash: 'fakehash',
            icon: PROXY_ICON,
            sourceVersion: null,
            dependencyMetadata: {},
            donationUrl: null,
            alerts: {
              install: 'test',
              uninstall: 'test',
              start: 'test',
              stop: 'test',
              restore: 'test',
            },
            s9pk: {
              url: 'https://github.com/Start9Labs/btc-rpc-proxy-startos/releases/download/v0.3.2.7.1/btc-rpc-proxy.s9pk',
              commitment: mockMerkleArchiveCommitment,
              signatures: {},
              publishedAt: Date.now().toString(),
            },
          },
        },
        categories: ['bitcoin'],
        otherVersions: {
          '0.3.2.7:0': {
            releaseNotes: 'Upstream release and minor fixes.',
          },
        },
      },
    },
  }

  export const RegistryPackages: GetPackagesRes = {
    bitcoind: {
      best: {
        '27.0.0:1.0.0': {
          title: 'Bitcoin Core',
          description: mockDescription,
          hardwareRequirements: { arch: null, device: {}, ram: null },
          license: 'mit',
          wrapperRepo: 'https://github.com/start9labs/bitcoind-startos',
          upstreamRepo: 'https://github.com/bitcoin/bitcoin',
          supportSite: 'https://bitcoin.org',
          marketingSite: 'https://bitcoin.org',
          releaseNotes: 'Even better support for Bitcoin and wallets!',
          osVersion: '0.3.6',
          gitHash: 'fakehash',
          icon: BTC_ICON,
          sourceVersion: null,
          dependencyMetadata: {},
          donationUrl: null,
          alerts: {
            install: 'test',
            uninstall: 'test',
            start: 'test',
            stop: 'test',
            restore: 'test',
          },
          s9pk: {
            url: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v27.0.0/bitcoind.s9pk',
            commitment: mockMerkleArchiveCommitment,
            signatures: {},
            publishedAt: Date.now().toString(),
          },
        },
        '#knots:27.1.0:0': {
          title: 'Bitcoin Knots',
          description: {
            short: 'An alternate fully verifying implementation of Bitcoin',
            long: 'Bitcoin Knots is a combined Bitcoin node and wallet. Not only is it easy to use, but it also ensures bitcoins you receive are both real bitcoins and really yours.',
          },
          hardwareRequirements: { arch: null, device: {}, ram: null },
          license: 'mit',
          wrapperRepo: 'https://github.com/start9labs/bitcoinknots-startos',
          upstreamRepo: 'https://github.com/bitcoinknots/bitcoin',
          supportSite: 'https://bitcoinknots.org',
          marketingSite: 'https://bitcoinknots.org',
          releaseNotes: 'Even better support for Bitcoin and wallets!',
          osVersion: '0.3.6',
          gitHash: 'fakehash',
          icon: BTC_ICON,
          sourceVersion: null,
          dependencyMetadata: {},
          donationUrl: null,
          alerts: {
            install: 'test',
            uninstall: 'test',
            start: 'test',
            stop: 'test',
            restore: 'test',
          },
          s9pk: {
            url: 'https://github.com/Start9Labs/bitcoinknots-startos/releases/download/v26.1.20240513/bitcoind.s9pk',
            commitment: mockMerkleArchiveCommitment,
            signatures: {},
            publishedAt: Date.now().toString(),
          },
        },
      },
      categories: ['bitcoin', 'featured'],
      otherVersions: {
        '26.1.0:0.1.0': {
          releaseNotes: 'Even better support for Bitcoin and wallets!',
        },
        '#knots:26.1.20240325:0': {
          releaseNotes: 'Even better Knots support for Bitcoin and wallets!',
        },
      },
    },
    lnd: {
      best: {
        '0.18.0:0.0.1': {
          title: 'LND',
          description: mockDescription,
          hardwareRequirements: { arch: null, device: {}, ram: null },
          license: 'mit',
          wrapperRepo: 'https://github.com/start9labs/lnd-startos',
          upstreamRepo: 'https://github.com/lightningnetwork/lnd',
          supportSite: 'https://lightning.engineering/slack.html',
          marketingSite: 'https://lightning.engineering/',
          releaseNotes: 'Upstream release and minor fixes.',
          osVersion: '0.3.6',
          gitHash: 'fakehash',
          icon: LND_ICON,
          sourceVersion: null,
          dependencyMetadata: {
            bitcoind: {
              title: 'Bitcoin Core',
              icon: BTC_ICON,
              description: 'Used for RPC requests',
              optional: false,
            },
            'btc-rpc-proxy': {
              title: 'Bitcoin Proxy',
              icon: null, // intentional to test fallback icon
              description: 'Used for authorized RPC requests',
              optional: true,
            },
          },
          donationUrl: null,
          alerts: {
            install: 'test',
            uninstall: 'test',
            start: 'test',
            stop: 'test',
            restore: 'test',
          },
          s9pk: {
            url: 'https://github.com/Start9Labs/lnd-startos/releases/download/v0.18.0.1/lnd.s9pk',
            commitment: mockMerkleArchiveCommitment,
            signatures: {},
            publishedAt: Date.now().toString(),
          },
        },
      },
      categories: ['lightning'],
      otherVersions: {
        '0.17.5:0': {
          releaseNotes: 'Upstream release to 0.17.5',
        },
        '0.17.4-beta:1.0-alpha': {
          releaseNotes: 'Upstream release to 0.17.4',
        },
      },
    },
    'btc-rpc-proxy': {
      best: {
        '0.3.2.7:0': {
          title: 'Bitcoin Proxy',
          description: mockDescription,
          hardwareRequirements: { arch: null, device: {}, ram: null },
          license: 'mit',
          wrapperRepo: 'https://github.com/Start9Labs/btc-rpc-proxy-wrappers',
          upstreamRepo: 'https://github.com/Kixunil/btc-rpc-proxy',
          supportSite: 'https://github.com/Kixunil/btc-rpc-proxy/issues',
          marketingSite: '',
          releaseNotes: 'Upstream release and minor fixes.',
          osVersion: '0.3.6',
          gitHash: 'fakehash',
          icon: PROXY_ICON,
          sourceVersion: null,
          dependencyMetadata: {
            bitcoind: {
              title: 'Bitcoin Core',
              icon: BTC_ICON,
              description: 'Used for RPC requests',
              optional: false,
            },
          },
          donationUrl: null,
          alerts: {
            install: 'test',
            uninstall: 'test',
            start: 'test',
            stop: 'test',
            restore: 'test',
          },
          s9pk: {
            url: 'https://github.com/Start9Labs/btc-rpc-proxy-startos/releases/download/v0.3.2.7/btc-rpc-proxy.s9pk',
            commitment: mockMerkleArchiveCommitment,
            signatures: {},
            publishedAt: Date.now().toString(),
          },
        },
      },
      categories: ['bitcoin'],
      otherVersions: {
        '0.3.2.6:0': {
          releaseNotes: 'Upstream release and minor fixes.',
        },
      },
    },
  }
}
