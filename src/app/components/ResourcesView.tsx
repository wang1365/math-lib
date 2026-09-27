'use client'

import { useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { resources, topics, type Format } from '@/lib/catalog'
import { resourceFormat, siteCopy } from '@/lib/site-copy'
import ResourceCard from './ResourceCard'

const formats: Format[] = ['Course', 'Video', 'Practice', 'Tool']

export default function ResourcesView() {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const topic = searchParams.get('topic') || ''
  const format = searchParams.get('format') || ''
  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value); else params.delete(key)
    router.replace(`${pathname}${params.size ? `?${params}` : ''}`, { scroll: false })
  }
  const filtered = useMemo(() => resources.filter(item => {
    const terms = `${item.name} ${item.summary} ${item.summaryZh} ${item.bestFor} ${item.bestForZh} ${item.topics.join(' ')}`.toLowerCase()
    return (!topic || item.topics.includes(topic as typeof item.topics[number])) && (!format || item.format === format) && (!query || terms.includes(query.toLowerCase().trim()))
  }), [topic, format, query])

  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.resources}</p><h1>{c.resourcesTitle}</h1><p>{c.resourcesLead}</p></header>
    <div className="directory-layout"><aside className="filter-panel" aria-label={zh ? '资源筛选' : 'Resource filters'}><h2>{zh ? '筛选' : 'Filter resources'}</h2>
      <label htmlFor="resource-search">{c.search}</label><input id="resource-search" type="search" value={query} onChange={e => { setQuery(e.target.value); update('q', e.target.value) }} placeholder={c.searchPlaceholder} />
      <label htmlFor="topic-filter">{c.topic}</label><select id="topic-filter" value={topic} onChange={e => update('topic', e.target.value)}><option value="">{c.allTopics}</option>{topics.map(item => <option value={item.id} key={item.id}>{zh ? item.zh : item.name}</option>)}</select>
      <label htmlFor="format-filter">{c.format}</label><select id="format-filter" value={format} onChange={e => update('format', e.target.value)}><option value="">{c.allFormats}</option>{formats.map(item => <option value={item} key={item}>{resourceFormat(item, locale)}</option>)}</select>
      {(topic || format || query) && <button className="clear-button" onClick={() => { setQuery(''); router.replace(pathname, { scroll: false }) }}>{c.clear}</button>}
    </aside><div className="directory-results"><div className="results-heading"><strong>{filtered.length} {c.results}</strong><span>{zh ? '按名称排序' : 'Sorted by name'}</span></div>{filtered.length ? <div className="directory-grid">{[...filtered].sort((a,b) => a.name.localeCompare(b.name)).map(item => <ResourceCard key={item.id} resource={item} locale={locale} />)}</div> : <p className="empty-state">{c.noResults}</p>}</div></div>
    <div className="editorial-note"><h2>{c.editorial}</h2><p>{c.editorialText}</p></div>
  </div>
}
