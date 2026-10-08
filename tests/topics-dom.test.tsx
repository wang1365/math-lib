import assert from 'node:assert/strict'
import { test } from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { JSDOM } from 'jsdom'
import TopicsView from '../src/app/components/TopicsView'
import { getGuideLesson } from '../src/lib/guideLessons'

for (const locale of ['en', 'zh-CN']) {
  test(`topics link to the completed, relevant units and their diagnostics (${locale})`, () => {
    const html = renderToStaticMarkup(<NextIntlClientProvider locale={locale} messages={{}}><TopicsView /></NextIntlClientProvider>)
    const dom = new JSDOM(html)
    const doc = dom.window.document
    const prefix = locale === 'en' ? '' : '/zh-CN'
    for (const [topic, slug] of [['algebra', 'algebra-foundations'], ['calculus', 'calculus-roadmap']]) {
      const section = doc.getElementById(topic)!
      assert.ok(getGuideLesson(locale, slug))
      assert.equal(section.querySelector('.topic-lesson h3')?.id, `${topic}-lesson-title`)
      assert.ok(section.querySelector(`a[href="${prefix}/guides/${slug}#diagnostic"]`))
      assert.ok(section.querySelector(`a[href="${prefix}/guides/${slug}"]`))
      assert.ok(section.querySelector(`a[href="${prefix}/resources?topic=${topic}"]`))
      assert.match(section.querySelector('.topic-lesson-links')!.textContent!, locale === 'en' ? /five-question diagnostic.*full learning unit/ : /五题诊断.*完整学习单元/)
    }
    assert.equal(doc.querySelectorAll('.topic-lesson').length, 2, 'Only existing complete units are offered')
    dom.window.close()
  })
}
