'use client'

import { useLocale } from 'next-intl'
import { siteCopy } from '@/lib/site-copy'
import MathFormula from './MathFormula'

const examples = [
  { title: 'Pythagorean theorem', zh: '勾股定理', topic: 'Geometry', topicZh: '几何', formula: 'a^2+b^2=c^2', use: 'Find a missing side in a right triangle.', useZh: '求直角三角形中未知边的长度。', worked: 'If a = 3 and b = 4, then c = √(9 + 16) = 5.', workedZh: '若 a = 3、b = 4，则 c = √(9 + 16) = 5。' },
  { title: 'Quadratic formula', zh: '一元二次方程求根公式', topic: 'Algebra', topicZh: '代数', formula: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}', use: 'Solve ax² + bx + c = 0 when factoring is difficult (a ≠ 0).', useZh: '当因式分解较困难时，求解 ax² + bx + c = 0（a ≠ 0）。', worked: 'For x² − 5x + 6 = 0: x = (5 ± 1) / 2, so x = 2 or 3.', workedZh: '对于 x² − 5x + 6 = 0：x = (5 ± 1) / 2，因此 x = 2 或 3。' },
  { title: 'Derivative power rule', zh: '幂函数求导法则', topic: 'Calculus', topicZh: '微积分', formula: '\\frac{d}{dx}x^n=nx^{n-1}', use: 'Find the instantaneous rate of change of a power function.', useZh: '求幂函数在某点的瞬时变化率。', worked: 'For f(x) = x³, f′(x) = 3x². At x = 2, the slope is 12.', workedZh: '对于 f(x) = x³，有 f′(x) = 3x²；在 x = 2 处斜率为 12。' },
]

export default function ExamplesView() {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.examples}</p><h1>{c.examplesTitle}</h1><p>{c.examplesLead}</p></header><div className="formula-list">{examples.map((item, index) => <article className="formula-card" key={item.title}><div className="formula-heading"><span className="eyebrow">0{index + 1} / {zh ? item.topicZh : item.topic}</span><h2>{zh ? item.zh : item.title}</h2></div><div className="formula-display"><MathFormula formula={item.formula} displayMode="block" /></div><div className="formula-explanation"><div><h3>{zh ? '何时使用' : 'When to use it'}</h3><p>{zh ? item.useZh : item.use}</p></div><div><h3>{zh ? '简单示例' : 'Worked example'}</h3><p>{zh ? item.workedZh : item.worked}</p></div></div></article>)}</div></div>
}
