/** Original diagrams share these mathematical inputs with their rendering and tests. */
export type LessonDiagramId = 'inequality' | 'draining-tank' | 'removable-limit' | 'velocity-area'
export type DiagramPoint = Readonly<{ x: number; y: number }>
export type PlotFrame = Readonly<{
  left: number; right: number; top: number; bottom: number
  xDomain: readonly [number, number]; yDomain: readonly [number, number]
}>

export function plotPoint(point: DiagramPoint, frame: PlotFrame): DiagramPoint {
  const [xMin, xMax] = frame.xDomain
  const [yMin, yMax] = frame.yDomain
  return {
    x: frame.left + (point.x - xMin) / (xMax - xMin) * (frame.right - frame.left),
    y: frame.bottom - (point.y - yMin) / (yMax - yMin) * (frame.bottom - frame.top),
  }
}

export function svgPoints(points: readonly DiagramPoint[], frame: PlotFrame): string {
  return points.map(point => {
    const { x, y } = plotPoint(point, frame)
    return `${x},${y}`
  }).join(' ')
}

export function polygonArea(points: readonly DiagramPoint[]): number {
  return Math.abs(points.reduce((sum, point, index) => {
    const next = points[(index + 1) % points.length]
    return sum + point.x * next.y - next.x * point.y
  }, 0)) / 2
}

export const inequalityModel = {
  coefficient: -3,
  constant: 5,
  rightSide: 14,
  boundary: (14 - 5) / -3,
  inclusive: true,
  direction: 'right',
  ticks: [-6, -5, -4, -3, -2, -1, 0, 1, 2],
  frame: { left: 42, right: 374, top: 55, bottom: 145, xDomain: [-6, 2], yDomain: [-1, 1] } satisfies PlotFrame,
} as const

export const tankVolume = (minutes: number): number => 34 - 4 * minutes
export const drainingTankModel = {
  domain: [0, 8.5],
  slope: -4,
  points: [0, 2, 5, 8.5].map(x => ({ x, y: tankVolume(x) })),
  slopeTriangle: [{ x: 2, y: 26 }, { x: 5, y: 26 }, { x: 5, y: 14 }],
  frame: { left: 52, right: 372, top: 52, bottom: 235, xDomain: [0, 9], yDomain: [0, 36] } satisfies PlotFrame,
} as const

/** The original quotient has no value at 3; simplifying must not fill its hole. */
export const quotientValue = (x: number): number | undefined => x === 3 ? undefined : (x * x - 9) / (x - 3)
export const removableLimitModel = {
  hole: { x: 3, y: 6 },
  line: [{ x: 0, y: 3 }, { x: 5, y: 8 }],
  approaches: [
    [{ x: 1.5, y: 4.5 }, { x: 2.65, y: 5.65 }],
    [{ x: 4.5, y: 7.5 }, { x: 3.35, y: 6.35 }],
  ],
  frame: { left: 52, right: 372, top: 52, bottom: 238, xDomain: [0, 5], yDomain: [0, 9] } satisfies PlotFrame,
} as const

export const velocity = (seconds: number): number => 2 * seconds - 4
const motionTimes = [0, 2, 3]
const regions = motionTimes.slice(0, -1).map((start, index) => {
  const end = motionTimes[index + 1]
  const from = { x: start, y: velocity(start) }
  const to = { x: end, y: velocity(end) }
  const vertices = [{ x: start, y: 0 }, from, to, { x: end, y: 0 }]
  return {
    start, end, vertices,
    speedVertices: vertices.map(point => ({ x: point.x, y: Math.abs(point.y) })),
    signedArea: (from.y + to.y) * (end - start) / 2,
    area: polygonArea(vertices),
  }
})

export const velocityAreaModel = {
  domain: [0, 3],
  zero: 2,
  points: motionTimes.map(x => ({ x, y: velocity(x) })),
  speedPoints: motionTimes.map(x => ({ x, y: Math.abs(velocity(x)) })),
  regions,
  displacement: regions.reduce((sum, region) => sum + region.signedArea, 0),
  distance: regions.reduce((sum, region) => sum + region.area, 0),
  // Identical scales make the reflection across the time axis directly comparable.
  frame: { left: 48, right: 350, top: 47, bottom: 233, xDomain: [0, 3.3], yDomain: [-4.5, 4.5] } satisfies PlotFrame,
} as const
