import assert from 'node:assert/strict'
import { test } from 'node:test'
import { renderToString } from 'katex'
import { getGuides } from '../src/lib/guideContent'
import { getGuideLesson, guideLessonSlugs } from '../src/lib/guideLessons'
import { resources, topics } from '../src/lib/catalog'
import { formulaExamples } from '../src/lib/formulaExamples'
import { comparisonReviewedAt, getResourceComparison } from '../src/lib/resourceComparison'

function verifyValues(value: unknown, path = 'content'): void {
  if (typeof value === 'string') assert.ok(value.trim().length, `${path} must not be empty`)
  if (Array.isArray(value)) value.forEach((item, i) => verifyValues(item, `${path}[${i}]`))
  else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      verifyValues(entry, `${path}.${key}`)
      if ((key === 'formula' || key === 'equation') && typeof entry === 'string') {
        assert.doesNotThrow(() => renderToString(entry, { throwOnError: true, strict: 'error' }), `${path}.${key}`)
      }
      if ((key === 'checkedAt') && typeof entry === 'string') {
        assert.match(entry, /^\d{4}-\d{2}-\d{2}$/)
        assert.ok(Date.parse(`${entry}T00:00:00Z`) <= Date.now(), 'Review date must not be in the future')
      }
      if (key === 'url' && typeof entry === 'string') assert.equal(new URL(entry).protocol, 'https:')
    }
  }
}

test('catalog and guide references are unique and point to existing content', () => {
  assert.equal(new Set(resources.map(resource => resource.id)).size, resources.length)
  const ids = new Set(resources.map(resource => resource.id))
  const topicIds = new Set(topics.map(topic => topic.id))
  for (const resource of resources) for (const topic of resource.topics) assert.ok(topicIds.has(topic))
  for (const locale of ['en', 'zh-CN']) {
    const guides = getGuides(locale)
    assert.equal(new Set(guides.map(guide => guide.slug)).size, guides.length)
    for (const guide of guides) for (const id of guide.resourceIds) assert.ok(ids.has(id), `Missing resource ${id}`)
    verifyValues(guides)
  }
  assert.deepEqual(getGuides('en').map(guide => guide.slug), getGuides('zh-CN').map(guide => guide.slug))
  verifyValues(resources)
})

for (const slug of guideLessonSlugs) {
  test(`${slug}: bilingual chapter structure, remediations, equations and complete answers`, () => {
    const en = getGuideLesson('en', slug)!
    const zh = getGuideLesson('zh-CN', slug)!
    assert.ok(en && zh)
    for (const lesson of [en, zh]) {
      verifyValues(lesson)
      assert.equal(lesson.chapters.length, 4)
      assert.ok(lesson.diagnostic.length >= 5)
      assert.ok(lesson.mastery.length >= 3)
      const chapters = new Set(lesson.chapters.map(chapter => chapter.id))
      assert.equal(chapters.size, lesson.chapters.length)
      const questions = [...lesson.diagnostic, ...lesson.chapters.flatMap(chapter => chapter.practice), ...lesson.mastery]
      assert.equal(new Set(questions.map(question => question.id)).size, questions.length)
      for (const question of questions) {
        assert.ok(chapters.has(question.reviewChapterId), `Remediation for ${question.id}`)
        assert.ok(question.answer && question.explanation && question.commonMistake)
      }
      for (const route of lesson.routes) assert.ok(chapters.has(route.chapterId))
      for (const chapter of lesson.chapters) {
        assert.ok(chapter.practice.length >= 2)
        assert.ok(chapter.example.steps.length >= 3)
        assert.ok(chapter.sources.length)
      }
      for (const step of lesson.nextSteps) assert.ok(step.href.startsWith('/'), 'Use an internal canonical next step')
    }
    assert.notEqual(en.title, zh.title)
    assert.deepEqual(en.chapters.map(chapter => chapter.id), zh.chapters.map(chapter => chapter.id))
    assert.deepEqual(en.diagnostic.map(question => question.id), zh.diagnostic.map(question => question.id))
    assert.deepEqual(en.mastery.map(question => question.id), zh.mastery.map(question => question.id))
    assert.deepEqual(en.chapters.flatMap(chapter => chapter.practice.map(question => question.id)), zh.chapters.flatMap(chapter => chapter.practice.map(question => question.id)))
    assert.deepEqual(en.chapters.flatMap(chapter => chapter.sources.map(source => source.url)), zh.chapters.flatMap(chapter => chapter.sources.map(source => source.url)))
  })
}

test('incomplete guides have no standalone lesson', () => {
  for (const slug of ['linear-algebra-roadmap', 'statistics-foundations', 'choosing-math-resources', 'unknown']) assert.equal(getGuideLesson('en', slug), undefined)
})

test('all formula examples are bilingual, render valid KaTeX, and have three explained exercises', () => {
  assert.equal(formulaExamples.length, 3)
  verifyValues(formulaExamples)
  for (const item of formulaExamples) {
    assert.equal(item.exercises.length, 3)
    assert.ok(guideLessonSlugs.some(slug => item.guidePath === `/guides/${slug}`))
    for (const exercise of item.exercises) assert.ok(exercise.answer.length)
  }
})

test('comparison keeps identical dimensions, links, and stages across languages', () => {
  const en = getResourceComparison('en')
  const zh = getResourceComparison('zh-CN')
  assert.equal(en.length, 4)
  assert.match(comparisonReviewedAt, /^\d{4}-\d{2}-\d{2}$/)
  assert.deepEqual(en.map(item => item.id), zh.map(item => item.id))
  verifyValues(en)
  verifyValues(zh)
  for (let i = 0; i < en.length; i++) {
    assert.deepEqual(Object.keys(en[i]), Object.keys(zh[i]))
    assert.equal(en[i].start.url, zh[i].start.url)
    assert.deepEqual(en[i].sources.map(source => source.url), zh[i].sources.map(source => source.url))
    assert.notEqual(en[i].nextStep, zh[i].nextStep)
  }
})
