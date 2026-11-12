// The site is built by Mintlify from the root of this repository. These checks
// keep it publishable and free of anything that is not public documentation.
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(readFileSync(path.join(ROOT, 'docs.json'), 'utf8'))

// Repository files that .mintignore keeps off the site.
const IGNORED = new Set(['.git', '.github', 'tests', 'node_modules', 'README.md', 'AGENTS.md', '.mintignore', '.gitignore'])

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (dir === ROOT && IGNORED.has(name)) return []
    const full = path.join(dir, name)
    return statSync(full).isDirectory() ? files(full) : [path.relative(ROOT, full)]
  })
}

function navigationPages(node) {
  if (Array.isArray(node)) return node.flatMap(navigationPages)
  if (!node || typeof node !== 'object') return []
  return Object.entries(node).flatMap(([key, value]) =>
    key === 'pages' ? value.filter((page) => typeof page === 'string') : navigationPages(value))
}

test('every page in the navigation exists', () => {
  const pages = navigationPages(config.navigation)
  assert.ok(pages.length > 10)
  for (const page of pages) assert.ok(existsSync(path.join(ROOT, `${page}.mdx`)), `missing ${page}.mdx`)
})

test('the logo, favicon and OpenAPI file the config points to exist', () => {
  const openapi = [config.api?.openapi].flat().filter(Boolean)
  assert.ok(openapi.length, 'api.openapi is set')
  for (const asset of [config.logo.dark, config.logo.light, config.favicon, ...openapi]) {
    assert.ok(existsSync(path.join(ROOT, asset.replace(/^\//, ''))), `missing ${asset}`)
  }
})

test('the published files are only public documentation', () => {
  const allowed = /\.(mdx|json|yaml|svg|png)$/
  for (const file of files(ROOT)) {
    assert.match(file, allowed, `${file} does not belong on the public docs site`)
  }
})

test('repository files stay off the site', () => {
  const ignored = readFileSync(path.join(ROOT, '.mintignore'), 'utf8')
  for (const entry of ['README.md', 'AGENTS.md', 'tests/', '.github/']) {
    assert.match(ignored, new RegExp(`^${entry.replace('.', '\\.')}$`, 'm'), entry)
  }
})
