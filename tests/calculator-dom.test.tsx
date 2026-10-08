import assert from 'node:assert/strict'
import { test } from 'node:test'
import { JSDOM } from 'jsdom'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { NextIntlClientProvider } from 'next-intl'
import CalculatorView from '../src/app/components/CalculatorView'

async function fixture(locale: string, check: (api: {
  press: (...keys: string[]) => Promise<void>
  key: (key: string, options?: KeyboardEventInit, target?: EventTarget) => Promise<KeyboardEvent>
  display: () => string | null | undefined
  render: (locale: string) => Promise<void>
}) => Promise<void>) {
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/calculator' })
  const names = ['self', 'window', 'document', 'HTMLElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLSelectElement', 'KeyboardEvent', 'MouseEvent'] as const
  for (const name of names) Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true })
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  const root = createRoot(document.getElementById('root')!)
  const render = async (value: string) => { await act(async () => root.render(<NextIntlClientProvider locale={value} messages={{}}><CalculatorView /></NextIntlClientProvider>)) }
  const press = async (...keys: string[]) => {
    for (const key of keys) await act(async () => {
      const button = [...document.querySelectorAll('button')].find(item => item.textContent === key)
      assert.ok(button, `Button ${key} exists`)
      button.click()
    })
  }
  const key = async (value: string, options: KeyboardEventInit = {}, target: EventTarget = window) => {
    const event = new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...options })
    await act(async () => { target.dispatchEvent(event) })
    return event
  }
  try {
    await render(locale)
    await check({ press, key, display: () => document.querySelector('[role="status"]')?.textContent, render })
  } finally {
    await act(async () => root.unmount())
    dom.window.close()
  }
}

for (const locale of ['en', 'zh-CN']) {
  test(`actual calculator component recovers from all division-error inputs (${locale})`, async () => {
    await fixture(locale, async ({ press, display }) => {
      for (const ending of ['=', '+']) {
        for (const recovery of ['2', '.', '⌫', 'AC']) {
          await press('AC', '1', '÷', '0', ending)
          assert.equal(display(), locale === 'en' ? 'Cannot divide by zero' : '不能除以零')
          await press('+', '=', '÷')
          assert.equal(display(), locale === 'en' ? 'Cannot divide by zero' : '不能除以零')
          await press(recovery)
          assert.equal(display(), recovery === '2' ? '2' : recovery === '.' ? '0.' : '0')
          await press('3', '+', '2', '=')
          assert.ok(Number.isFinite(Number(display())))
        }
      }
    })
  })
}

test('actual component keyboard matches buttons and respects editing and shortcut keys', async () => {
  await fixture('en', async ({ key, display, press }) => {
    for (const value of ['2', '+', '3', '*', '4', 'Enter']) await key(value)
    assert.equal(display(), '20')
    await key('Escape')
    for (const value of ['1', '/', '0', 'Enter', '.', '5', '+', '2', 'Enter']) await key(value)
    assert.equal(display(), '2.5')
    assert.equal((await key('3', { ctrlKey: true })).defaultPrevented, false)
    assert.equal((await key('4', { metaKey: true })).defaultPrevented, false)
    assert.equal(display(), '2.5')
    const input = document.createElement('input')
    document.body.append(input)
    assert.equal((await key('8', {}, input)).defaultPrevented, false)
    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    const child = document.createElement('span')
    editable.append(child)
    document.body.append(editable)
    assert.equal((await key('9', {}, child)).defaultPrevented, false)
    assert.equal(display(), '2.5')
    const button = document.querySelector('button')!
    assert.equal((await key('Enter', {}, button)).defaultPrevented, false)
    await press('AC', '0', '.', '1', '+', '0', '.', '2', '=')
    assert.equal(display(), '0.3')
  })
})

test('changing locale during an error cannot poison numeric state', async () => {
  await fixture('en', async ({ press, display, render }) => {
    await press('1', '÷', '0', '=')
    await render('zh-CN')
    assert.equal(display(), '不能除以零')
    await press('.', '5', '+', '1', '=')
    assert.equal(display(), '1.5')
  })
})
