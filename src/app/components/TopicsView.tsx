'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { resources, topics } from '@/lib/catalog'
import { localPath, resourceFormat, siteCopy } from '@/lib/site-copy'

export default function TopicsView() {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.topics}</p><h1>{c.topicsTitle}</h1><p>{c.topicsLead}</p></header>
    <div className="topics-layout"><nav className="topic-index-nav" aria-label={c.topics}>{topics.map(item => <a key={item.id} href={`#${item.id}`}>{zh ? item.zh : item.name}</a>)}</nav><div className="topic-sections">{topics.map((item, index) => <section className="topic-section" key={item.id} id={item.id}><div className="topic-section-heading"><span className="eyebrow">0{index + 1} / {zh ? item.levelZh : item.level}</span><h2>{zh ? item.zh : item.name}</h2><p>{zh ? item.descriptionZh : item.description}</p></div><div className="topic-section-body"><div><h3>{c.startingPoint}</h3><ol>{(zh ? item.stepsZh : item.steps).map(step => <li key={step}>{step}</li>)}</ol></div><div><h3>{c.recommended}</h3><ul>{resources.filter(resource => resource.topics.includes(item.id)).slice(0, 3).map(resource => <li key={resource.id}>{resource.name} <span>{resourceFormat(resource.format, locale)}</span></li>)}</ul></div></div><p className="topic-checkpoint"><strong>{zh ? '自测问题：' : 'Check your understanding:'}</strong> {zh ? item.checkpointZh : item.checkpoint}</p><Link className="text-link" href={localPath(locale, `/resources?topic=${item.id}`)}>{c.viewResources}<ArrowRight size={17} aria-hidden="true" /></Link></section>)}</div></div>
  </div>
}
