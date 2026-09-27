'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import { resources, topics, type Format } from '@/lib/catalog'
import type { ResourceFilters } from '@/lib/resourceFilters'
import { resourceFormat, siteCopy } from '@/lib/site-copy'
import ResourceCard from './ResourceCard'

const formats: Format[] = ['Course', 'Textbook', 'Notes', 'Video', 'Practice', 'Tool', 'Collection']

export default function ResourcesView({ initialFilters }: { initialFilters: ResourceFilters }) {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  const [filters, setFilters] = useState(initialFilters)
  const { q: query, topic, format } = filters

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search)
      setFilters({ q: params.get('q') || '', topic: params.get('topic') || '', format: params.get('format') || '' })
    }
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [])

  const update = (key: keyof ResourceFilters, value: string) => {
    setFilters(current => ({ ...current, [key]: value }))
    const params = new URLSearchParams(window.location.search)
    if (value) params.set(key, value); else params.delete(key)
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${params.size ? `?${params}` : ''}`)
  }
  const clear = () => {
    setFilters({ q: '', topic: '', format: '' })
    window.history.replaceState(window.history.state, '', window.location.pathname)
  }
  const filtered = useMemo(() => resources.filter(item => {
    const terms = `${item.name} ${item.summary} ${item.summaryZh} ${item.bestFor} ${item.bestForZh} ${item.topics.join(' ')}`.toLowerCase()
    return (!topic || item.topics.includes(topic as typeof item.topics[number])) && (!format || item.format === format) && (!query || terms.includes(query.toLowerCase().trim()))
  }), [topic, format, query])

  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.resources}</p><h1>{c.resourcesTitle}</h1><p>{c.resourcesLead}</p></header>
    <div className="directory-layout"><aside className="filter-panel" aria-label={zh ? '资源筛选' : 'Resource filters'}><h2>{zh ? '筛选' : 'Filter resources'}</h2>
      <label htmlFor="resource-search">{c.search}</label><input id="resource-search" type="search" value={query} onChange={e => update('q', e.target.value)} placeholder={c.searchPlaceholder} />
      <label htmlFor="topic-filter">{c.topic}</label><select id="topic-filter" value={topic} onChange={e => update('topic', e.target.value)}><option value="">{c.allTopics}</option>{topics.map(item => <option value={item.id} key={item.id}>{zh ? item.zh : item.name}</option>)}</select>
      <label htmlFor="format-filter">{c.format}</label><select id="format-filter" value={format} onChange={e => update('format', e.target.value)}><option value="">{c.allFormats}</option>{formats.map(item => <option value={item} key={item}>{resourceFormat(item, locale)}</option>)}</select>
      {(topic || format || query) && <button className="clear-button" onClick={clear}>{c.clear}</button>}
    </aside><div className="directory-results"><div className="results-heading"><strong>{filtered.length} {c.results}</strong><span>{zh ? '按名称排序' : 'Sorted by name'}</span></div>{filtered.length ? <div className="directory-grid">{[...filtered].sort((a,b) => a.name.localeCompare(b.name)).map(item => <ResourceCard key={item.id} resource={item} locale={locale} />)}</div> : <p className="empty-state">{c.noResults}</p>}</div></div>
    <div className="editorial-note"><h2>{c.editorial}</h2><p>{c.editorialText}</p></div>
  </div>
}
