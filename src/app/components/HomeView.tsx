'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { featuredResourceIds, resources, topics } from '@/lib/catalog'
import { localPath, siteCopy } from '@/lib/site-copy'
import ResourceCard from './ResourceCard'

export default function HomeView() {
  const locale = useLocale()
  const c = siteCopy(locale)
  const zh = locale.startsWith('zh')
  const goals = [
    { number: '01', title: c.goal1, text: c.goal1Text, topic: 'algebra' },
    { number: '02', title: c.goal2, text: c.goal2Text, topic: 'linear-algebra' },
    { number: '03', title: c.goal3, text: c.goal3Text, topic: 'calculus' },
  ]
  return <>
    <section className="home-hero container-wide">
      <div className="home-hero-copy"><p className="eyebrow accent">{c.homeEyebrow}</p><h1>{c.homeTitle}</h1><p className="hero-lead">{c.homeLead}</p><div className="button-row"><Link className="button button-primary" href={localPath(locale, '/resources')}>{c.browse}<ArrowRight size={18} aria-hidden="true" /></Link><Link className="button button-secondary" href={localPath(locale, '/branches')}>{c.exploreTopics}</Link></div></div>
      <div className="hero-aside" aria-label={zh ? '主题预览' : 'Topic preview'}><div className="hero-aside-header"><span>{zh ? '从一个主题开始' : 'Start with a topic'}</span><span aria-hidden="true">↗</span></div><div className="hero-equation" aria-hidden="true">f(x) = x² + 2x + 1</div><div className="hero-aside-list">{topics.slice(0, 3).map((topic, i) => <Link key={topic.id} href={localPath(locale, `/branches#${topic.id}`)}><span>0{i + 1}</span>{zh ? topic.zh : topic.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div></div>
    </section>
    <section className="section-band"><div className="container-wide section-inner"><div className="section-heading"><div><p className="eyebrow accent">01 / {c.topics}</p><h2>{c.learning}</h2><p>{c.learningLead}</p></div><Link className="text-link" href={localPath(locale, '/branches')}>{c.exploreTopics}<ArrowRight size={17} aria-hidden="true" /></Link></div><div className="topic-grid">{topics.map((topic, index) => <Link className="topic-tile" key={topic.id} href={localPath(locale, `/branches#${topic.id}`)}><span className="topic-index">0{index + 1}</span><h3>{zh ? topic.zh : topic.name}</h3><p>{zh ? topic.descriptionZh : topic.description}</p><span className="tile-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span></Link>)}</div></div></section>
    <section className="container-wide section-inner"><div className="section-heading"><div><p className="eyebrow accent">02 / {c.goals}</p><h2>{c.goals}</h2><p>{c.goalsLead}</p></div></div><div className="goal-list">{goals.map(goal => <Link className="goal-row" href={localPath(locale, `/resources?topic=${goal.topic}`)} key={goal.number}><span className="goal-number">{goal.number}</span><span><strong>{goal.title}</strong><small>{goal.text}</small></span><ArrowUpRight size={21} aria-hidden="true" /></Link>)}</div></section>
    <section className="section-band"><div className="container-wide section-inner"><div className="section-heading"><div><p className="eyebrow accent">03 / {c.resources}</p><h2>{c.selected}</h2><p>{c.selectedLead}</p></div><Link className="text-link" href={localPath(locale, '/resources')}>{c.seeAll}<ArrowRight size={17} aria-hidden="true" /></Link></div><div className="resource-grid">{featuredResourceIds.map(id => { const resource = resources.find(item => item.id === id)!; return <ResourceCard key={id} resource={resource} locale={locale} compact /> })}</div></div></section>
    <section className="container-wide editorial-strip"><div><p className="eyebrow accent">OnlyMath / {zh ? '编辑原则' : 'Our approach'}</p><h2>{c.editorial}</h2></div><p>{c.editorialText}</p></section>
  </>
}
