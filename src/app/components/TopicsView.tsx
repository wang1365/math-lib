'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { resources, topics, type TopicId } from '@/lib/catalog'
import { localPath, resourceFormat, siteCopy } from '@/lib/site-copy'

const topicLessons: Partial<Record<TopicId, { slug: string; title: string; titleZh: string; description: string; descriptionZh: string }>> = {
  algebra: {
    slug: 'algebra-foundations', title: 'Algebra foundations', titleZh: '代数基础',
    description: 'Check fractions, equations, inequalities, slope, and functions, then choose the chapter that fits your results.',
    descriptionZh: '先检查分数、方程、不等式、斜率与函数基础，再根据结果选择适合的章节。',
  },
  calculus: {
    slug: 'calculus-roadmap', title: 'First steps in calculus', titleZh: '微积分入门',
    description: 'Check your algebra readiness and your understanding of limits, rates, and accumulation before starting the unit.',
    descriptionZh: '开始本单元前，先检查代数准备度，以及对极限、变化率与累积量的理解。',
  },
}

function TopicLessonLinks({ topic, locale }: { topic: TopicId; locale: string }) {
  const lesson = topicLessons[topic]
  if (!lesson) return null
  const zh = locale.startsWith('zh')
  const path = localPath(locale, `/guides/${lesson.slug}`)
  return <div className="topic-lesson" aria-labelledby={`${topic}-lesson-title`}>
    <h3 id={`${topic}-lesson-title`}>{zh ? lesson.titleZh : lesson.title}</h3>
    <p>{zh ? lesson.descriptionZh : lesson.description}</p>
    <div className="topic-lesson-links">
      <Link className="text-link" href={`${path}#diagnostic`}>{zh ? '开始五题诊断' : 'Start the five-question diagnostic'}<ArrowRight size={17} aria-hidden="true" /></Link>
      <Link className="text-link" href={path}>{zh ? '阅读完整学习单元' : 'Read the full learning unit'}<ArrowRight size={17} aria-hidden="true" /></Link>
    </div>
  </div>
}

export default function TopicsView() {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.topics}</p><h1>{c.topicsTitle}</h1><p>{c.topicsLead}</p></header>
    <div className="topics-layout"><nav className="topic-index-nav" aria-label={c.topics}>{topics.map(item => <a key={item.id} href={`#${item.id}`}>{zh ? item.zh : item.name}</a>)}</nav><div className="topic-sections">{topics.map((item, index) => <section className="topic-section" key={item.id} id={item.id}><div className="topic-section-heading"><span className="eyebrow">0{index + 1} / {zh ? item.levelZh : item.level}</span><h2>{zh ? item.zh : item.name}</h2><p>{zh ? item.descriptionZh : item.description}</p></div><div className="topic-section-body"><div><h3>{c.startingPoint}</h3><ol>{(zh ? item.stepsZh : item.steps).map(step => <li key={step}>{step}</li>)}</ol></div><div><h3>{c.recommended}</h3><ul>{resources.filter(resource => resource.topics.includes(item.id)).slice(0, 3).map(resource => <li key={resource.id}>{resource.name} <span>{resourceFormat(resource.format, locale)}</span></li>)}</ul></div></div><p className="topic-checkpoint"><strong>{zh ? '自测问题：' : 'Check your understanding:'}</strong> {zh ? item.checkpointZh : item.checkpoint}</p><TopicLessonLinks topic={item.id} locale={locale} /><Link className="text-link" href={localPath(locale, `/resources?topic=${item.id}`)}>{c.viewResources}<ArrowRight size={17} aria-hidden="true" /></Link></section>)}</div></div>
  </div>
}
