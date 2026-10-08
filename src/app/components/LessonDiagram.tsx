import { useId, type ReactNode } from 'react'
import {
  drainingTankModel,
  inequalityModel,
  plotPoint,
  removableLimitModel,
  svgPoints,
  velocityAreaModel,
  type LessonDiagramId,
  type PlotFrame,
} from '@/lib/lessonDiagramModels'
import { lessonDiagramCopy } from '@/lib/lessonDiagramCopy'

type Copy = ReturnType<typeof lessonDiagramCopy>
const number = (value: number) => String(value).replace('-', '−')

function Graph({ id, title, description, height = 300, children }: {
  id: string; title: string; description: string; height?: number; children: ReactNode
}) {
  return <svg className="lesson-diagram-svg" viewBox={`0 0 420 ${height}`} role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} focusable="false">
    <title id={`${id}-title`}>{title}</title>
    <desc id={`${id}-description`}>{description}</desc>
    {children}
  </svg>
}

function Arrow({ id }: { id: string }) {
  return <defs><marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9 Z" fill="currentColor" /></marker></defs>
}

function Axes({ frame, xTicks, yTicks, xLabel, yLabel }: {
  frame: PlotFrame; xTicks: number[]; yTicks: number[]; xLabel: string; yLabel: string
}) {
  const origin = plotPoint({ x: 0, y: 0 }, frame)
  return <g className="lesson-diagram-axes">
    {yTicks.filter(value => value !== 0).map(value => {
      const { y } = plotPoint({ x: 0, y: value }, frame)
      return <g key={value}>
        <line className="lesson-diagram-grid" x1={frame.left} x2={frame.right} y1={y} y2={y} />
        <text x={frame.left - 10} y={y + 6} textAnchor="end">{number(value)}</text>
      </g>
    })}
    <line className="lesson-diagram-axis" x1={frame.left} x2={frame.right + 7} y1={origin.y} y2={origin.y} />
    <line className="lesson-diagram-axis" x1={origin.x} x2={origin.x} y1={frame.top - 6} y2={frame.bottom + 3} />
    {xTicks.map(value => {
      const { x } = plotPoint({ x: value, y: 0 }, frame)
      return <g key={value}>
        <line className="lesson-diagram-axis" x1={x} x2={x} y1={origin.y - 4} y2={origin.y + 5} />
        <text x={x} y={origin.y + 23} textAnchor="middle">{number(value)}</text>
      </g>
    })}
    <text className="lesson-diagram-axis-label" x={frame.left} y="24">{yLabel}</text>
    <text className="lesson-diagram-axis-label" x="212" y="284" textAnchor="middle">{xLabel}</text>
  </g>
}

function Inequality({ id, copy }: { id: string; copy: Copy }) {
  const { frame, boundary, ticks } = inequalityModel
  const endpoint = plotPoint({ x: boundary, y: 0 }, frame)
  return <Graph id={id} title={copy.title} description={copy.description} height={200}>
    <Arrow id={`${id}-arrow`} />
    <text x="210" y="30" textAnchor="middle" className="lesson-diagram-formula">5 − 3x ≤ 14 ⇒ x ≥ −3</text>
    <line className="lesson-diagram-axis" x1="30" x2="390" y1={endpoint.y} y2={endpoint.y} />
    {ticks.map(tick => {
      const { x } = plotPoint({ x: tick, y: 0 }, frame)
      return <g key={tick}>
        <line className="lesson-diagram-axis" x1={x} x2={x} y1={endpoint.y - 5} y2={endpoint.y + 5} />
        <text x={x} y={endpoint.y + 27} textAnchor="middle">{number(tick)}</text>
      </g>
    })}
    <line className="lesson-diagram-curve lesson-diagram-ray" x1={endpoint.x} x2="382" y1={endpoint.y} y2={endpoint.y} markerEnd={`url(#${id}-arrow)`} />
    <circle className="lesson-diagram-point" cx={endpoint.x} cy={endpoint.y} r="7" />
    <text x="210" y="165" textAnchor="middle">{copy.included}</text>
    <text x="210" y="189" textAnchor="middle">{copy.ray}</text>
  </Graph>
}

function DrainingTank({ id, copy }: { id: string; copy: Copy }) {
  const { frame, points, slopeTriangle } = drainingTankModel
  const labels = [{ dx: 12, dy: -8 }, { dx: 0, dy: 36 }, { dx: -10, dy: 27 }, { dx: 52, dy: -25 }]
  return <Graph id={id} title={copy.title} description={copy.description}>
    <Axes frame={frame} xTicks={[0, 2, 5, 8.5]} yTicks={[14, 26, 34]} xLabel={copy.timeMinutes} yLabel={copy.volume} />
    <polyline className="lesson-diagram-guide" points={svgPoints(slopeTriangle, frame)} />
    <polyline className="lesson-diagram-curve" points={svgPoints(points, frame)} />
    <text x="248" y="59" textAnchor="middle" className="lesson-diagram-formula">V(t) = 34 − 4t</text>
    <text x="178" y="95" textAnchor="middle" className="lesson-diagram-note">{copy.slopeTime}</text>
    <text x="241" y="142" className="lesson-diagram-note">{copy.slopeVolume}</text>
    {points.map((point, index) => {
      const position = plotPoint(point, frame)
      return <g key={point.x}>
        <circle className="lesson-diagram-point" cx={position.x} cy={position.y} r="4.5" />
        <text x={position.x + labels[index].dx} y={position.y + labels[index].dy} textAnchor={index === 0 ? 'start' : 'end'} className="lesson-diagram-note">({point.x}, {point.y})</text>
      </g>
    })}
  </Graph>
}

function RemovableLimit({ id, copy }: { id: string; copy: Copy }) {
  const { frame, hole, line, approaches } = removableLimitModel
  const position = plotPoint(hole, frame)
  return <Graph id={id} title={copy.title} description={copy.description}>
    <Arrow id={`${id}-arrow`} />
    <Axes frame={frame} xTicks={[0, 1, 2, 3, 4, 5]} yTicks={[3, 6, 9]} xLabel="x" yLabel="f(x)" />
    <polyline className="lesson-diagram-guide" points={svgPoints([{ x: 0, y: 6 }, hole, { x: 3, y: 0 }], frame)} />
    <polyline className="lesson-diagram-curve lesson-diagram-limit-line" points={svgPoints(line, frame)} />
    {approaches.map((points, index) => <polyline key={index} className="lesson-diagram-curve" points={svgPoints(points, frame)} markerEnd={`url(#${id}-arrow)`} />)}
    <circle className="lesson-diagram-hole" cx={position.x} cy={position.y} r="7" />
    <text x="115" y="54" className="lesson-diagram-formula">y = x + 3 (x ≠ 3)</text>
    <text x={position.x + 13} y={position.y + 30} className="lesson-diagram-note">(3, 6)</text>
  </Graph>
}

function MotionGraph({ id, copy, speed }: { id: string; copy: Copy; speed: boolean }) {
  const { frame, points, speedPoints, regions } = velocityAreaModel
  const title = speed ? copy.distance : copy.displacement
  const areaLabel = plotPoint({ x: 2 / 3, y: speed ? 4 / 3 : -4 / 3 }, frame)
  return <div className="lesson-diagram-panel">
    <p className="lesson-diagram-panel-title">{title}</p>
    <Graph id={id} title={title} description={copy.description}>
      <defs>
        <pattern id={`${id}-negative`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" className="lesson-diagram-negative-fill" />
          <path d="M -2 2 L 2 -2 M 0 8 L 8 0 M 6 10 L 10 6" className="lesson-diagram-hatch" />
        </pattern>
        <pattern id={`${id}-positive`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" className="lesson-diagram-positive-fill" />
          <circle cx="4" cy="4" r="1.1" className="lesson-diagram-dot" />
        </pattern>
      </defs>
      {regions.map(region => <polygon key={region.start} className="lesson-diagram-area" data-signed-area={speed ? region.area : region.signedArea} points={svgPoints(speed ? region.speedVertices : region.vertices, frame)} fill={`url(#${id}-${!speed && region.signedArea < 0 ? 'negative' : 'positive'})`} />)}
      <Axes frame={frame} xTicks={[0, 1, 2, 3]} yTicks={[-4, -2, 2, 4]} xLabel={copy.timeSeconds} yLabel={speed ? copy.speed : copy.velocity} />
      <polyline className="lesson-diagram-curve" points={svgPoints(speed ? speedPoints : points, frame)} />
      <text x="244" y="48" textAnchor="middle" className="lesson-diagram-formula">{speed ? '|v(t)| = |2t − 4|' : 'v(t) = 2t − 4'}</text>
      <text x={areaLabel.x} y={areaLabel.y + 5} textAnchor="middle" className="lesson-diagram-area-label">{speed ? '+4' : '−4'} {copy.meter}</text>
      <path d="M 309 92 L 300 121" className="lesson-diagram-guide" />
      <text x="310" y="84" textAnchor="middle" className="lesson-diagram-area-label">+1 {copy.meter}</text>
    </Graph>
    <p className="lesson-diagram-total">{speed ? copy.distanceTotal : copy.displacementTotal}</p>
  </div>
}

/** Static SVG, original mathematical geometry, and localized text are available without JS. */
export default function LessonDiagram({ diagram, locale }: { diagram: LessonDiagramId; locale: string }) {
  const instance = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = `lesson-diagram-${diagram}-${instance}`
  const copy = lessonDiagramCopy(diagram, locale)
  return <figure className="lesson-diagram" data-diagram={diagram} aria-labelledby={`${id}-heading`}>
    <p className="lesson-diagram-title" id={`${id}-heading`}>{copy.title}</p>
    {diagram === 'inequality' && <Inequality id={id} copy={copy} />}
    {diagram === 'draining-tank' && <DrainingTank id={id} copy={copy} />}
    {diagram === 'removable-limit' && <RemovableLimit id={id} copy={copy} />}
    {diagram === 'velocity-area' && <div className="lesson-diagram-panels">
      <MotionGraph id={`${id}-velocity`} copy={copy} speed={false} />
      <MotionGraph id={`${id}-speed`} copy={copy} speed />
    </div>}
    <figcaption>{copy.caption}</figcaption>
  </figure>
}
