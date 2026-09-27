'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Calculator, ChartNoAxesCombined, Shapes } from 'lucide-react'
import { useLocale } from 'next-intl'
import { localPath, siteCopy } from '@/lib/site-copy'

export default function ToolsView() {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.tools}</p><h1>{c.toolsTitle}</h1><p>{c.toolsLead}</p></header>
    <div className="tool-grid">
      <article className="tool-card"><div className="tool-icon"><Calculator size={23} /></div><p className="eyebrow accent">{c.toolReady}</p><h2>{c.calcTitle}</h2><p>{c.calcLead}</p><Link className="text-link" href={localPath(locale, '/calculator')}>{c.openTool}<ArrowRight size={17} aria-hidden="true" /></Link></article>
      <article className="tool-card"><div className="tool-icon"><ChartNoAxesCombined size={23} /></div><p className="eyebrow accent">{c.toolExternal}</p><h2>Desmos Graphing Calculator</h2><p>{zh ? '交互式绘制函数图像，适合探索方程与图像的关系。' : 'Graph functions interactively and explore how equations shape a curve.'}</p><a className="text-link" href="https://www.desmos.com/calculator" target="_blank" rel="noopener noreferrer">{c.openTool}<ArrowUpRight size={17} aria-hidden="true" /></a></article>
      <article className="tool-card"><div className="tool-icon"><Shapes size={23} /></div><p className="eyebrow accent">{c.toolExternal}</p><h2>GeoGebra</h2><p>{zh ? '创建可拖动的几何图形，观察关系如何变化。' : 'Build interactive geometric constructions and see relationships change.'}</p><a className="text-link" href="https://www.geogebra.org/" target="_blank" rel="noopener noreferrer">{c.openTool}<ArrowUpRight size={17} aria-hidden="true" /></a></article>
    </div><p className="tool-note">{c.toolNote}</p>
  </div>
}
