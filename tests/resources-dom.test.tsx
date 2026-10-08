import assert from 'node:assert/strict'
import { test } from 'node:test'
import { JSDOM } from 'jsdom'
import { act, startTransition, useInsertionEffect } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { SearchParamsContext, PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { AppRouterContext, type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { resources } from '../src/lib/catalog'
import type { ResourceFilters } from '../src/lib/resourceFilters'

const emptyFilters: ResourceFilters = { q: '', topic: '', format: '' }

async function fixture(locale: string, query: string, check: (api: {
  select: (id: string, value: string) => Promise<void>
  search: (value: string) => Promise<void>
  clear: () => Promise<void>
  navigate: (path: string) => Promise<void>
  history: (direction: 'back' | 'forward') => Promise<void>
  remount: () => Promise<void>
  restorePage: (path: string) => Promise<void>
  routerQuery: () => string
  cards: () => NodeListOf<Element>
  assertFilters: (filters: ResourceFilters) => void
  switchLanguage: (locale: string) => Promise<void>
}) => Promise<void>) {
  const prefix = locale === 'en' ? '' : '/zh-CN'
  const dom = new JSDOM('<div id="root"></div>', { url: `http://localhost${prefix}/resources${query}` })
  for (const name of ['self', 'window', 'document', 'HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'Event', 'PopStateEvent', 'MouseEvent'] as const) Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true })
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  // Load the client renderer after the DOM so React uses native input events.
  const { createRoot } = await import('react-dom/client')
  const { default: ResourcesView } = await import('../src/app/components/ResourcesView')
  const { default: LanguageSwitcher } = await import('../src/app/components/LanguageSwitcher')
  const root = createRoot(document.getElementById('root')!)
  let key = 0
  let routerSearch = window.location.search
  let routerPathname = window.location.pathname
  let pendingNavigation: string | null = null
  let restoreVersion = 0
  const originalReplace = window.history.replaceState.bind(window.history)
  const originalPush = window.history.pushState.bind(window.history)
  originalReplace({ __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: { cached: true } }, '')
  function HistoryCommit() {
    // Next's HistoryUpdater writes the new URL after rendering router context.
    useInsertionEffect(() => {
      if (pendingNavigation !== null) {
        originalPush({ __NA: true }, '', pendingNavigation)
        pendingNavigation = null
      }
    })
    return null
  }
  const render = () => {
    const locale = routerPathname.startsWith('/zh-CN') ? 'zh-CN' : 'en'
    const resourcesVisible = routerPathname.endsWith('/resources')
    root.render(<AppRouterContext.Provider value={router}><PathnameContext.Provider value={routerPathname}><SearchParamsContext.Provider value={new URLSearchParams(routerSearch)}><NextIntlClientProvider locale={locale} messages={{}}>
      <HistoryCommit />
      <LanguageSwitcher />
      {resourcesVisible ? <ResourcesView key={key} initialFilters={emptyFilters} /> : <p>Guides</p>}
    </NextIntlClientProvider></SearchParamsContext.Provider></PathnameContext.Provider></AppRouterContext.Provider>)
  }
  const restore = () => {
    const version = ++restoreVersion
    const { search, pathname } = window.location
    // Next 16 dispatches ACTION_RESTORE in a transition; its async action queue
    // resolves later. An immediate context render hides controlled-input bugs.
    startTransition(() => {
      void Promise.resolve().then(() => {
        if (version !== restoreVersion) return
        routerSearch = search
        routerPathname = pathname
        render()
      })
    })
  }
  // Model Next 16's documented History API integration, including its internal-flag
  // bypass. Copying history.state used to bypass URL synchronization in production.
  window.history.replaceState = (data, unused, url) => {
    if (data?.__NA || data?._N) return originalReplace(data, unused, url)
    originalReplace({ ...data, __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE }, unused, url)
    restore()
  }
  window.addEventListener('popstate', restore)
  const navigate = async (path: string) => {
    await act(async () => router.push(path))
  }
  const router: AppRouterInstance = {
    push: (href: string) => {
      // The production HTTP suite separately verifies the /en canonical redirect.
      pendingNavigation = href.replace(/^\/en(?=\/|$)/, '') || '/'
      const url = new URL(pendingNavigation, window.location.href)
      routerSearch = url.search
      routerPathname = url.pathname
      restoreVersion++
      render()
    },
    replace: () => {}, back: () => window.history.back(), forward: () => window.history.forward(),
    refresh: () => {}, prefetch: async () => {},
  }
  const select = async (id: string, value: string) => {
    await act(async () => {
      const select = document.querySelector<HTMLSelectElement>(id)!
      select.value = value
      select.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }
  try {
    await act(async () => render())
    await check({
      select,
      search: async value => {
        await act(async () => {
          const input = document.querySelector<HTMLInputElement>('#resource-search')!
          Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
          input.dispatchEvent(new Event('input', { bubbles: true }))
        })
      },
      clear: async () => { await act(async () => document.querySelector<HTMLButtonElement>('.clear-button')!.click()) },
      navigate,
      history: async direction => {
        await act(async () => {
          await new Promise<void>(resolve => {
            window.addEventListener('popstate', () => resolve(), { once: true })
            window.history[direction]()
          })
        })
      },
      remount: async () => { await act(async () => { key++; render() }) },
      restorePage: async path => {
        await act(async () => {
          originalReplace(window.history.state, '', path)
          window.dispatchEvent(new Event('pageshow'))
        })
      },
      routerQuery: () => routerSearch,
      cards: () => document.querySelectorAll('.directory-results .resource-card'),
      assertFilters: expected => {
        assert.equal(document.querySelector<HTMLInputElement>('#resource-search')!.value, expected.q)
        assert.equal(document.querySelector<HTMLSelectElement>('#topic-filter')!.value, expected.topic)
        assert.equal(document.querySelector<HTMLSelectElement>('#format-filter')!.value, expected.format)
      },
      switchLanguage: value => select('.language-select select', value),
    })
  } finally {
    restoreVersion++
    window.removeEventListener('popstate', restore)
    window.history.replaceState = originalReplace
    await act(async () => root.unmount())
    dom.window.close()
  }
}

for (const locale of ['en', 'zh-CN']) {
  test(`search preserves middle-edit caret and rapid input before router restoration (${locale})`, async () => {
    await fixture(locale, '?q=OpenStax', async api => {
      const input = document.querySelector<HTMLInputElement>('#resource-search')!
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
      input.focus()
      input.setSelectionRange(4, 4)
      await act(async () => {
        let expected = 'OpenStax'
        let cursor = 4
        // Deliberately emit several events before the mocked asynchronous Next
        // restore can commit, including a non-Latin edit in the Chinese locale.
        for (const text of locale === 'en' ? ['X', '1', '2', '3'] : ['微', '积', '分']) {
          const next = input.value.slice(0, input.selectionStart!) + text + input.value.slice(input.selectionEnd!)
          expected = expected.slice(0, cursor) + text + expected.slice(cursor)
          cursor += text.length
          setValue.call(input, next)
          input.setSelectionRange(cursor, cursor)
          input.dispatchEvent(new Event('input', { bubbles: true }))
          assert.equal(input.value, expected, 'The controlled input must update in the native event')
          assert.equal(input.selectionStart, cursor, 'Middle edits must not move the caret to the end')
          assert.equal(input.selectionEnd, cursor)
          assert.equal(new URLSearchParams(window.location.search).get('q'), expected)
        }
      })
      const expected = locale === 'en' ? 'OpenX123Stax' : 'Open微积分Stax'
      api.assertFilters({ q: expected, topic: '', format: '' })
      assert.equal(input.selectionStart, locale === 'en' ? 8 : 7, 'Router commit must preserve the caret too')
      assert.equal(document.activeElement, input)
      assert.equal(window.history.length, 1)
      await api.clear()
      api.assertFilters(emptyFilters)
      assert.equal(api.cards().length, resources.length)
    })
  })

  test(`combined filters survive route exit, Back/Forward and stale-prop remount (${locale})`, async () => {
    await fixture(locale, '', async api => {
      await api.select('#topic-filter', 'calculus')
      await api.select('#format-filter', 'Textbook')
      await api.search('OpenStax')
      const expected = { q: 'OpenStax', topic: 'calculus', format: 'Textbook' }
      api.assertFilters(expected)
      assert.equal(api.cards().length, 1)
      assert.equal(api.routerQuery(), window.location.search, 'Native filter writes must also synchronize Next’s router')
      assert.match(api.cards()[0].textContent!, /OpenStax Calculus Volume 1/)
      assert.equal(window.history.length, 1, 'Typing/filtering replaces a single history entry')
      const filteredUrl = window.location.href
      await api.navigate(`${locale === 'en' ? '' : '/zh-CN'}/guides`)
      assert.equal(api.cards().length, 0)
      await api.history('back')
      assert.equal(window.location.href, filteredUrl)
      api.assertFilters(expected)
      assert.equal(api.cards().length, 1)
      await api.history('forward')
      assert.equal(api.cards().length, 0)
      await api.history('back')
      await api.remount()
      api.assertFilters(expected)
      assert.equal(api.cards().length, 1)
      assert.equal(document.querySelector('[role="status"]')?.textContent, locale === 'en' ? '1 resource' : '1 项资源')
      await api.clear()
      api.assertFilters(emptyFilters)
      assert.equal(api.cards().length, resources.length)
      assert.equal(window.location.search, '')
      assert.equal(api.routerQuery(), '')
      assert.equal(document.querySelectorAll('.comparison-card').length, 4)
    })
  })
}

test('same-route router commits and restored pages update the URL-backed controls', async () => {
  await fixture('en', '?q=no-results', async api => {
    const expected = { q: 'OpenStax', topic: 'calculus', format: 'Textbook' }
    // This navigation renders the new router context before its insertion effect
    // writes history, as Next does. No native popstate event fires.
    await api.navigate('/resources?q=OpenStax&topic=calculus&format=Textbook')
    api.assertFilters(expected)
    assert.equal(api.cards().length, 1)
    await api.history('back')
    api.assertFilters({ q: 'no-results', topic: '', format: '' })
    assert.equal(api.cards().length, 0)
    await api.history('forward')
    api.assertFilters(expected)
    assert.equal(api.cards().length, 1)
    // A bfcache restore can expose a newer browser URL than cached router props.
    await api.restorePage('/resources?topic=algebra&ref=return#algebra-to-derivatives')
    api.assertFilters({ q: '', topic: 'algebra', format: '' })
    assert.equal(api.cards().length, resources.filter(resource => resource.topics.includes('algebra')).length)
    await api.clear()
    api.assertFilters(emptyFilters)
    assert.equal(window.location.search, '?ref=return')
    assert.equal(window.location.hash, '#algebra-to-derivatives')
  })
})

test('URL stays authoritative on initial render, language switching and empty-result clearing', async () => {
  await fixture('zh-CN', '?q=OpenStax&topic=calculus&format=Textbook&ref=topics#algebra-to-derivatives', async api => {
    const expected = { q: 'OpenStax', topic: 'calculus', format: 'Textbook' }
    api.assertFilters(expected)
    assert.equal(api.cards().length, 1)
    for (const locale of ['en', 'zh-CN', 'en']) {
      await api.switchLanguage(locale)
      api.assertFilters(expected)
      assert.equal(api.cards().length, 1)
      assert.equal(window.location.hash, '#algebra-to-derivatives')
      assert.equal(new URLSearchParams(window.location.search).get('ref'), 'topics')
    }
    await api.search('no-such-resource')
    assert.equal(api.cards().length, 0)
    assert.equal(document.querySelector('[role="status"]')?.textContent, '0 resources')
    assert.ok(document.querySelector('.empty-state'))
    await api.clear()
    api.assertFilters(emptyFilters)
    assert.equal(api.cards().length, resources.length)
    assert.equal(window.location.search, '?ref=topics')
    assert.equal(window.location.hash, '#algebra-to-derivatives')
    assert.equal(document.querySelector('[role="status"]')?.textContent, `${resources.length} resources`)
    await api.search('  oPeNsTaX  ')
    assert.ok(api.cards().length > 1)
    for (const card of api.cards()) assert.match(card.textContent!, /OpenStax/)
    await api.search('')
    assert.equal(api.cards().length, resources.length)
    assert.equal(new URLSearchParams(window.location.search).has('q'), false)
  })
})
