import assert from 'node:assert/strict'
import { test } from 'node:test'
import { JSDOM } from 'jsdom'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { NextIntlClientProvider } from 'next-intl'
import ResourcesView from '../src/app/components/ResourcesView'
import { resources } from '../src/lib/catalog'

test('resource filters still select, clear, restore history, and coexist with comparison', async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/resources?q=unfindable' })
  for (const name of ['self', 'window', 'document', 'HTMLElement', 'HTMLInputElement', 'Event', 'PopStateEvent'] as const) Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true })
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  const root = createRoot(document.getElementById('root')!)
  const cards = () => document.querySelectorAll('.directory-results .resource-card')
  const clear = () => document.querySelector<HTMLButtonElement>('.clear-button')!.click()
  try {
    await act(async () => root.render(<NextIntlClientProvider locale="en" messages={{}}><ResourcesView initialFilters={{ q: 'unfindable', topic: '', format: '' }} /></NextIntlClientProvider>))
    assert.equal(cards().length, 0)
    assert.ok(document.querySelector('.empty-state'))
    assert.equal(document.querySelectorAll('.comparison-card').length, 4)
    await act(async () => clear())
    assert.equal(cards().length, resources.length)
    assert.equal(window.location.search, '')
    await act(async () => {
      const select = document.querySelector<HTMLSelectElement>('#topic-filter')!
      select.value = 'calculus'
      select.dispatchEvent(new Event('change', { bubbles: true }))
    })
    assert.equal(cards().length, resources.filter(resource => resource.topics.includes('calculus')).length)
    assert.equal(new URLSearchParams(window.location.search).get('topic'), 'calculus')
    await act(async () => {
      window.history.replaceState(window.history.state, '', '/resources?q=OpenStax&format=Textbook')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    assert.equal(document.querySelector<HTMLInputElement>('#resource-search')!.value, 'OpenStax')
    assert.equal(document.querySelector<HTMLSelectElement>('#format-filter')!.value, 'Textbook')
    assert.equal(document.querySelector<HTMLSelectElement>('#topic-filter')!.value, '')
    assert.ok(cards().length > 0)
    for (const card of cards()) assert.match(card.textContent!, /OpenStax/)
    await act(async () => clear())
    assert.equal(cards().length, resources.length)
    assert.equal(document.querySelectorAll('.comparison-card').length, 4)
  } finally {
    await act(async () => root.unmount())
    dom.window.close()
  }
})
