// Transitional patch (delete when brochure-marketplace ports into the start-os monorepo).
// The published @start9labs/start-sdk root entry re-exports server-side code (node:util,
// node:fs) that breaks the browser bundle (Vite externalizes node:util -> util.promisify
// is undefined at runtime). Point the package's `browser` field at the browser-safe
// base/lib so Vite/esbuild resolve there — mirroring start-os's `file:../sdk/baseDist`.
const { readFileSync, writeFileSync } = require('fs')

const BROWSER_ENTRY = './base/lib/index.js'

try {
  const pkgPath = require.resolve('@start9labs/start-sdk/package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  if (pkg.browser !== BROWSER_ENTRY) {
    pkg.browser = BROWSER_ENTRY
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
    console.log(`[patch-start-sdk] set browser -> ${BROWSER_ENTRY}`)
  }
} catch (e) {
  console.warn('[patch-start-sdk] skipped:', e.message)
}
