import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { spawn, type ChildProcess } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'

const base = 'http://127.0.0.1:3107'
let server: ChildProcess
let output = ''

before(async () => {
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3107'], { stdio: ['ignore', 'pipe', 'pipe'] })
  server.stdout?.on('data', data => { output += data.toString() })
  server.stderr?.on('data', data => { output += data.toString() })
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Next failed to start:\n${output}`)
    try { if ((await fetch(`${base}/`, { headers: { 'Accept-Language': 'en' } })).ok) return } catch { /* Wait for startup. */ }
    await delay(100)
  }
  throw new Error(`Next did not return a successful page during startup (check for redirects):\n${output}`)
}, { timeout: 30000 })

after(async () => {
  if (server && server.exitCode === null) {
    server.kill('SIGTERM')
    await new Promise<void>(resolve => server.once('exit', () => resolve()))
  }
})

const read = async (path: string, headers: Record<string, string> = {}) => {
  const response = await fetch(base + path, { headers: { 'Accept-Language': 'en', ...headers }, redirect: 'manual' })
  return { response, document: new JSDOM(await response.text()).window.document }
}

for (const locale of ['en', 'zh-CN']) {
  const prefix = locale === 'en' ? '' : '/zh-CN'
  for (const path of ['/', '/guides', '/guides/algebra-foundations', '/guides/calculus-roadmap', '/resources', '/examples', '/calculator']) {
    const localized = `${prefix}${path === '/' ? '' : path}` || '/'
    test(`200, language and canonical metadata: ${localized}`, async () => {
      const { response, document } = await read(localized)
      assert.equal(response.status, 200)
      assert.equal(document.documentElement.lang, locale)
      assert.equal(document.querySelectorAll('h1').length, 1)
      assert.equal(new URL(document.querySelector('link[rel="canonical"]')!.getAttribute('href')!).pathname, localized)
      const alternates = [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
      assert.deepEqual(alternates.map(link => link.getAttribute('hreflang')).sort(), ['en', 'x-default', 'zh-CN'])
      for (const alternate of alternates) {
        const lang = alternate.getAttribute('hreflang')
        const expected = lang === 'zh-CN' ? `/zh-CN${path === '/' ? '' : path}` : path
        assert.equal(new URL(alternate.getAttribute('href')!).pathname, expected)
      }
      assert.equal(document.querySelector('meta[property="og:locale"]')?.getAttribute('content'), locale === 'en' ? 'en_US' : 'zh_CN')
      assert.equal(document.querySelectorAll('.katex-error').length, 0)
      if (path.startsWith('/guides/')) {
        assert.ok(document.querySelectorAll('details').length >= 15, 'Exercises and solutions are in server-rendered HTML')
        assert.equal(document.querySelectorAll('.lesson-chapter').length, 4)
        assert.ok(document.querySelector('.lesson-main')!.textContent!.length > 5000)
        const ids = [...document.querySelectorAll('[id]')].map(element => element.id)
        assert.equal(ids.length, new Set(ids).size, 'IDs are unique')
        for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) assert.ok(document.getElementById(link.getAttribute('href')!.slice(1)), `Existing anchor: ${link.getAttribute('href')}`)
      }
      if (path === '/examples') assert.equal(document.querySelectorAll('.formula-answer').length, 9)
      if (path === '/resources') assert.equal(document.querySelectorAll('.comparison-card').length, 4)
    })
  }
}

test('unknown and unfinished guide slugs return 404 rather than thin pages', async () => {
  for (const path of ['/guides/not-a-guide', '/zh-CN/guides/not-a-guide', '/guides/statistics-foundations']) {
    assert.equal((await read(path)).response.status, 404)
  }
})

test('English aliases and retired locales redirect to canonical bilingual routes', async () => {
  for (const [path, target] of [
    ['/en', '/'], ['/en/guides/algebra-foundations', '/guides/algebra-foundations'],
    ['/fr/guides/calculus-roadmap', '/guides/calculus-roadmap'],
    ['/zh-TW/guides/calculus-roadmap', '/zh-CN/guides/calculus-roadmap'],
  ]) {
    const { response } = await read(path)
    assert.ok([307, 308].includes(response.status))
    assert.equal(new URL(response.headers.get('location')!, base).pathname, target)
    assert.equal((await read(target)).response.status, 200)
  }
})

test('locale negotiation redirects without serving Chinese at an English canonical URL', async () => {
  for (const headers of [{ 'Accept-Language': 'zh-CN' }, { Cookie: 'NEXT_LOCALE=zh-CN' }] as Record<string, string>[]) {
    const { response } = await read('/guides/algebra-foundations', headers)
    assert.ok([307, 308].includes(response.status))
    assert.equal(new URL(response.headers.get('location')!, base).pathname, '/zh-CN/guides/algebra-foundations')
  }
  assert.equal((await read('/zh-CN/guides/algebra-foundations', { Cookie: 'NEXT_LOCALE=en' })).response.status, 200)
})

test('filtered resource page keeps directory canonical and handles empty results', async () => {
  const { response, document } = await read('/resources?q=no-matching-math-resource&topic=algebra')
  assert.equal(response.status, 200)
  assert.equal(new URL(document.querySelector('link[rel="canonical"]')!.getAttribute('href')!).pathname, '/resources')
  assert.equal(document.querySelectorAll('.directory-results .resource-card').length, 0)
  assert.match(document.querySelector('.empty-state')!.textContent!, /No resources match/)
  assert.equal(document.querySelector<HTMLInputElement>('#resource-search')?.value, 'no-matching-math-resource')
})

test('sitemap includes all four completed detail pages and only canonical URLs', async () => {
  const xml = readFileSync('public/sitemap-0.xml', 'utf8')
  const document = new JSDOM(xml, { contentType: 'text/xml' }).window.document
  const paths = [...document.querySelectorAll('url > loc')].map(loc => new URL(loc.textContent!).pathname)
  assert.equal(paths.length, new Set(paths).size)
  for (const path of ['/guides/algebra-foundations', '/guides/calculus-roadmap', '/zh-CN/guides/algebra-foundations', '/zh-CN/guides/calculus-roadmap']) assert.ok(paths.includes(path))
  for (const path of paths) {
    assert.doesNotMatch(path, /^\/(en|fr|ja|es|pt|ko|ar|de|zh-TW)(\/|$)|\[|\?/)
    assert.equal((await read(path)).response.status, 200, `Sitemap path: ${path}`)
  }
})

test('explicit English switch updates a saved Chinese preference and preserves filters', async () => {
  const { response } = await read('/en/resources?q=algebra&format=Textbook', { Cookie: 'NEXT_LOCALE=zh-CN', 'Accept-Language': 'zh-CN' })
  assert.ok([307, 308].includes(response.status))
  const target = new URL(response.headers.get('location')!, base)
  assert.equal(target.pathname, '/resources')
  assert.equal(target.searchParams.get('q'), 'algebra')
  assert.match(response.headers.get('set-cookie')!, /NEXT_LOCALE=en/)
  const canonical = await read(target.pathname + target.search, { Cookie: 'NEXT_LOCALE=en', 'Accept-Language': 'zh-CN' })
  assert.equal(canonical.response.status, 200)
  assert.equal(canonical.document.documentElement.lang, 'en')
})
