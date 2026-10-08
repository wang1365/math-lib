import assert from 'node:assert/strict'
import { test } from 'node:test'
import { pageMetadata, type Section } from '../src/lib/metadata'
import { buildRouteMetadata } from '../src/lib/routeMetadata'
import { alternateLanguages, buildPageMetadata, localizedPath } from '../src/lib/seo'
import { localPath, localeSwitchPath } from '../src/lib/site-copy'
import { parseResourceFilters } from '../src/lib/resourceFilters'

for (const locale of ['en', 'zh-CN']) {
  test(`canonical and language paths agree (${locale})`, () => {
    for (const path of ['/', '/guides', '/guides/algebra-foundations', '/guides/calculus-roadmap', '/resources', '/examples']) {
      assert.equal(localPath(locale, path), localizedPath(locale, path))
      const metadata = buildPageMetadata({ title: 'Title', description: 'Description', locale, path })
      assert.equal(metadata.alternates?.canonical, localPath(locale, path))
      assert.deepEqual(metadata.alternates?.languages, alternateLanguages(path))
      assert.equal(metadata.openGraph?.locale, locale === 'en' ? 'en_US' : 'zh_CN')
      assert.equal(metadata.alternates?.languages?.['x-default'], path)
    }
  })
  test(`legacy and current metadata have identical truthful descriptions (${locale})`, async () => {
    for (const section of ['home', 'calculator', 'examples', 'resources', 'branches', 'tools', 'guides'] as Section[]) {
      assert.deepEqual(await buildRouteMetadata(section, locale), pageMetadata(locale, section))
      assert.doesNotMatch(JSON.stringify(pageMetadata(locale, 'calculator')), /scientific calculator/)
    }
  })
}

test('resource query parsing handles repeated, absent and empty values', () => {
  assert.deepEqual(parseResourceFilters({ q: ['algebra', 'calculus'], topic: 'algebra', format: [] }), { q: 'algebra', topic: 'algebra', format: '' })
  assert.deepEqual(parseResourceFilters({}), { q: '', topic: '', format: '' })
})

test('explicit English language switch can replace a saved Chinese preference', () => {
  assert.equal(localeSwitchPath('en', '/'), '/en')
  assert.equal(localeSwitchPath('en', '/guides/algebra-foundations'), '/en/guides/algebra-foundations')
  assert.equal(localeSwitchPath('zh-CN', '/guides/algebra-foundations'), '/zh-CN/guides/algebra-foundations')
})
