import assert from 'node:assert/strict'
import { test } from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { JSDOM } from 'jsdom'
import LessonDiagram from '../src/app/components/LessonDiagram'
import { getGuideLesson, guideLessonSlugs } from '../src/lib/guideLessons'
import { lessonDiagramCopy } from '../src/lib/lessonDiagramCopy'
import {
  drainingTankModel, inequalityModel, plotPoint, polygonArea, quotientValue,
  removableLimitModel, svgPoints, tankVolume, velocity, velocityAreaModel,
  type LessonDiagramId,
} from '../src/lib/lessonDiagramModels'

const diagrams: LessonDiagramId[] = ['inequality', 'draining-tank', 'removable-limit', 'velocity-area']
const render = (diagram: LessonDiagramId, locale = 'en') => new JSDOM(renderToStaticMarkup(<LessonDiagram diagram={diagram} locale={locale} />)).window.document
const approximately = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} should equal ${expected}`)
const pointsAttribute = (element: Element) => element.getAttribute('points')!.split(' ').map(pair => {
  const [x, y] = pair.split(',').map(Number)
  return { x, y }
})

test('inequality uses the actual exercise, an included boundary, and the correct direction', () => {
  const { coefficient, constant, rightSide, boundary, inclusive, direction, frame } = inequalityModel
  assert.equal(boundary, -3)
  assert.equal(inclusive, true)
  assert.equal(direction, 'right')
  for (const [input, solution] of [[-4, false], [-3, true], [0, true]] as const) {
    assert.equal(coefficient * input + constant <= rightSide, solution)
    assert.equal(input >= boundary, solution)
  }
  const document = render('inequality')
  const dot = document.querySelector('circle')!
  const ray = document.querySelector('.lesson-diagram-ray')!
  const projected = plotPoint({ x: -3, y: 0 }, frame)
  assert.deepEqual(projected, { x: 166.5, y: 100 })
  assert.equal(Number(dot.getAttribute('cx')), projected.x)
  assert.equal(Number(dot.getAttribute('cy')), projected.y)
  assert.equal(dot.getAttribute('class'), 'lesson-diagram-point')
  assert.equal(Number(ray.getAttribute('x1')), projected.x)
  assert.ok(Number(ray.getAttribute('x2')) > projected.x)
  assert.ok(ray.hasAttribute('marker-end'))
  assert.match(document.querySelector('svg')!.textContent!, /5 − 3x ≤ 14 ⇒ x ≥ −3/)
})

test('tank geometry uses all measured points, the slope triangle, and only its physical domain', () => {
  const { points, domain, slope, slopeTriangle, frame } = drainingTankModel
  assert.deepEqual(domain, [0, 8.5])
  assert.deepEqual(points, [{ x: 0, y: 34 }, { x: 2, y: 26 }, { x: 5, y: 14 }, { x: 8.5, y: 0 }])
  assert.equal((points[2].y - points[1].y) / (points[2].x - points[1].x), slope)
  assert.equal(slope, -4)
  assert.equal(slopeTriangle[1].x - slopeTriangle[0].x, 3)
  assert.equal(slopeTriangle[2].y - slopeTriangle[1].y, -12)
  for (const point of points) assert.equal(point.y, tankVolume(point.x))
  const document = render('draining-tank')
  const curve = document.querySelector('.lesson-diagram-curve')!
  assert.equal(curve.getAttribute('points'), svgPoints(points, frame))
  assert.equal(curve.getAttribute('marker-end'), null, 'Finite physical segment must not imply continuation')
  assert.equal(document.querySelector('.lesson-diagram-guide')!.getAttribute('points'), svgPoints(slopeTriangle, frame))
  pointsAttribute(curve).forEach(point => {
    assert.ok(point.x >= frame.left && point.x <= plotPoint({ x: domain[1], y: 0 }, frame).x)
    assert.ok(point.y <= frame.bottom)
  })
  assert.match(document.querySelector('desc')!.textContent!, /0 ≤ t ≤ 8.5/)
})

test('limit keeps f(3) undefined while both sides approach the open point (3, 6)', () => {
  assert.equal(quotientValue(3), undefined)
  for (const x of [0, 2, 2.9, 2.99, 3.01, 3.1, 4, 5]) approximately(quotientValue(x)!, x + 3)
  const { hole, frame, approaches } = removableLimitModel
  assert.deepEqual(hole, { x: 3, y: 6 })
  assert.ok(approaches[0][0].x < approaches[0][1].x && approaches[0][1].x < 3)
  assert.ok(approaches[1][0].x > approaches[1][1].x && approaches[1][1].x > 3)
  const document = render('removable-limit')
  const openPoint = document.querySelector('.lesson-diagram-hole')!
  const projected = plotPoint(hole, frame)
  approximately(Number(openPoint.getAttribute('cx')), projected.x)
  approximately(Number(openPoint.getAttribute('cy')), projected.y)
  assert.equal(document.querySelector('.lesson-diagram-point'), null, 'Do not fill the removable hole')
  assert.equal(document.querySelectorAll('polyline[marker-end]').length, 2)
  assert.match(document.querySelector('desc')!.textContent!, /f\(3\) is undefined/)
  assert.match(document.querySelector('figcaption')!.textContent!, /limit is 6/)
})

test('velocity regions and speed reflection give displacement −3 m and distance 5 m', () => {
  const { points, speedPoints, regions, displacement, distance, domain, zero } = velocityAreaModel
  assert.deepEqual(domain, [0, 3])
  assert.equal(zero, 2)
  assert.deepEqual(points, [{ x: 0, y: -4 }, { x: 2, y: 0 }, { x: 3, y: 2 }])
  assert.deepEqual(speedPoints, [{ x: 0, y: 4 }, { x: 2, y: 0 }, { x: 3, y: 2 }])
  assert.equal(velocity(zero), 0)
  assert.deepEqual(regions.map(region => region.signedArea), [-4, 1])
  assert.deepEqual(regions.map(region => polygonArea(region.vertices)), [4, 1])
  assert.deepEqual(regions.map(region => polygonArea(region.speedVertices)), [4, 1])
  assert.equal(displacement, -3)
  assert.equal(distance, 5)
  assert.notEqual(Math.abs(displacement), distance)
  regions.forEach(region => region.speedVertices.forEach((point, index) => {
    assert.equal(point.x, region.vertices[index].x)
    assert.equal(point.y, Math.abs(region.vertices[index].y))
  }))
})

test('rendered area geometry preserves areas and distinguishes signs with patterns and labels', () => {
  const document = render('velocity-area')
  const svgs = [...document.querySelectorAll('svg')]
  const { frame, regions, points, speedPoints } = velocityAreaModel
  const areaScale = (frame.right - frame.left) / (frame.xDomain[1] - frame.xDomain[0]) * (frame.bottom - frame.top) / (frame.yDomain[1] - frame.yDomain[0])
  assert.equal(svgs.length, 2)
  for (const [index, svg] of svgs.entries()) {
    const polygons = [...svg.querySelectorAll('polygon')]
    assert.equal(polygons.length, 2)
    polygons.forEach((polygon, regionIndex) => {
      const region = regions[regionIndex]
      const vertices = index === 0 ? region.vertices : region.speedVertices
      assert.equal(polygon.getAttribute('points'), svgPoints(vertices, frame))
      approximately(polygonArea(pointsAttribute(polygon)) / areaScale, region.area)
      assert.equal(Number(polygon.getAttribute('data-signed-area')), index === 0 ? region.signedArea : region.area)
    })
    assert.equal(svg.querySelector('.lesson-diagram-curve')!.getAttribute('points'), svgPoints(index === 0 ? points : speedPoints, frame))
    assert.match(polygons[1].getAttribute('fill')!, /positive/)
    assert.match(polygons[0].getAttribute('fill')!, index === 0 ? /negative/ : /positive/)
    assert.ok(svg.querySelector('pattern path'), 'Negative area has hatching, beyond color')
    assert.ok(svg.querySelector('pattern circle'), 'Positive area has dots, beyond color')
    assert.match(svg.textContent!, index === 0 ? /−4 m/ : /\+4 m/)
    assert.match(svg.textContent!, /\+1 m/)
  }
  assert.deepEqual([...document.querySelectorAll('.lesson-diagram-total')].map(node => node.textContent), ['−4 m + 1 m = −3 m', '4 m + 1 m = 5 m'])
})

for (const locale of ['en', 'zh-CN']) {
  test(`all diagrams have complete localized accessible SVGs, visible captions, and scalable geometry (${locale})`, () => {
    for (const diagram of diagrams) {
      const document = render(diagram, locale)
      const copy = lessonDiagramCopy(diagram, locale)
      assert.equal(document.querySelector('figcaption')!.textContent, copy.caption)
      const figure = document.querySelector('figure')!
      assert.equal(document.getElementById(figure.getAttribute('aria-labelledby')!)!.textContent, copy.title)
      for (const svg of document.querySelectorAll('svg')) {
        assert.equal(svg.getAttribute('role'), 'img')
        assert.equal(svg.getAttribute('focusable'), 'false')
        assert.match(svg.getAttribute('viewBox')!, /^0 0 420 (200|300)$/)
        assert.equal(svg.getAttribute('width'), null, 'CSS scales SVG to its container')
        assert.ok(document.getElementById(svg.getAttribute('aria-labelledby')!)!.textContent!.trim())
        assert.equal(document.getElementById(svg.getAttribute('aria-describedby')!)!.textContent, copy.description)
      }
      if (locale === 'zh-CN') {
        assert.match(copy.title, /[\u3400-\u9fff]/)
        assert.match(copy.caption, /[\u3400-\u9fff]/)
        assert.match(copy.description, /[\u3400-\u9fff]/)
        assert.doesNotMatch(document.body.textContent!, /\b(Time|Volume|Velocity|Speed|Filled|Rightward|displacement|distance|Signed|Absolute|undefined)\b/)
      }
      assert.doesNotMatch(document.body.innerHTML, /NaN|Infinity/)
    }
  })

  test(`diagram references match existing lesson examples and keep inequality inside its practice answer (${locale})`, () => {
    assert.equal(guideLessonSlugs.length, 2)
    const algebra = getGuideLesson(locale, 'algebra-foundations')!
    const calculus = getGuideLesson(locale, 'calculus-roadmap')!
    assert.equal(algebra.chapters.find(chapter => chapter.id === 'linear-models')!.example.diagram, 'draining-tank')
    const equations = algebra.chapters.find(chapter => chapter.id === 'equations')!
    assert.equal(equations.example.diagram, undefined)
    const inequality = equations.practice.find(problem => problem.id === 'a-2-2')!
    assert.equal(inequality.diagram, 'inequality')
    assert.equal(inequality.equation, '5-3x\\leq14')
    assert.equal(calculus.chapters.find(chapter => chapter.id === 'limits')!.example.diagram, 'removable-limit')
    assert.equal(calculus.chapters.find(chapter => chapter.id === 'integrals')!.example.diagram, 'velocity-area')
    const references = [algebra, calculus].flatMap(lesson => lesson.chapters.flatMap(chapter => [chapter.example.diagram, ...chapter.practice.map(problem => problem.diagram)].filter(Boolean)))
    assert.deepEqual(references, diagrams)
  })
}

test('all copy is translated, including units and panel totals', () => {
  for (const diagram of diagrams) {
    const en = lessonDiagramCopy(diagram, 'en')
    const zh = lessonDiagramCopy(diagram, 'zh-CN')
    for (const key of Object.keys(en) as (keyof typeof en)[]) {
      assert.notEqual(en[key], zh[key], `${diagram}.${key} needs both languages`)
      assert.ok(zh[key].trim())
    }
  }
})

test('repeated diagrams have unique accessible and SVG pattern IDs with valid references', () => {
  const document = new JSDOM(renderToStaticMarkup(<>{diagrams.flatMap(diagram => [0, 1].map(instance => <LessonDiagram key={`${diagram}-${instance}`} diagram={diagram} locale={instance ? 'zh-CN' : 'en'} />))}</>)).window.document
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const node of document.querySelectorAll('[aria-labelledby], [aria-describedby], [marker-end], [fill]')) {
    for (const attribute of ['aria-labelledby', 'aria-describedby', 'marker-end', 'fill']) {
      const value = node.getAttribute(attribute)
      if (!value || (attribute === 'fill' && !value.startsWith('url('))) continue
      const target = value.replace(/^url\(#|\)$/g, '')
      assert.ok(document.getElementById(target), `${attribute} must reference an existing element: ${value}`)
    }
  }
})
