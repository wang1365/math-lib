'use client'

import { useLayoutEffect, useMemo, useSyncExternalStore } from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { resources, topics, type Format } from '@/lib/catalog'
import type { ResourceFilters } from '@/lib/resourceFilters'
import { resourceFormat, siteCopy } from '@/lib/site-copy'
import ResourceCard from './ResourceCard'
import ResourceComparison from './ResourceComparison'

const formats: Format[] = ['Course', 'Textbook', 'Notes', 'Video', 'Practice', 'Tool', 'Collection']
const filtersChangedEvent = 'onlymath:resource-filters-changed'

function subscribeToFilters(onChange: () => void) {
  window.addEventListener(filtersChangedEvent, onChange)
  window.addEventListener('popstate', onChange)
  window.addEventListener('pageshow', onChange)
  return () => {
    window.removeEventListener(filtersChangedEvent, onChange)
    window.removeEventListener('popstate', onChange)
    window.removeEventListener('pageshow', onChange)
  }
}

function readSearch() { return window.location.search.slice(1) }
function notifyFiltersChanged() { window.dispatchEvent(new Event(filtersChangedEvent)) }

function replaceFilters(params: URLSearchParams) {
  // Passing Next's internal history state skips its URL synchronization hook.
  // Next copies the required router state itself when this public API gets null.
  window.history.replaceState(null, '', `${window.location.pathname}${params.size ? `?${params}` : ''}${window.location.hash}`)
  notifyFiltersChanged()
}

export default function ResourcesView({ initialFilters }: { initialFilters: ResourceFilters }) {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  const routerSearch = useSearchParams()?.toString() ?? new URLSearchParams(initialFilters).toString()
  // Next restores native history changes asynchronously. Read the URL as an
  // external store so controlled inputs update synchronously and keep their caret.
  // The router snapshot also keeps server rendering and hydration consistent.
  const search = useSyncExternalStore(subscribeToFilters, readSearch, () => routerSearch)
  // A Next Link/router navigation writes history during its insertion effect,
  // after render. Notify after that commit, including same-route query changes.
  useLayoutEffect(notifyFiltersChanged, [routerSearch])
  const params = new URLSearchParams(search)
  const query = params.get('q') || ''
  const topic = params.get('topic') || ''
  const format = params.get('format') || ''

  const update = (key: keyof ResourceFilters, value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value) params.set(key, value); else params.delete(key)
    replaceFilters(params)
  }
  const clear = () => {
    const params = new URLSearchParams(window.location.search)
    for (const key of ['q', 'topic', 'format']) params.delete(key)
    replaceFilters(params)
  }
  const filtered = useMemo(() => resources.filter(item => {
    const terms = `${item.name} ${item.summary} ${item.summaryZh} ${item.bestFor} ${item.bestForZh} ${item.topics.join(' ')}`.toLowerCase()
    return (!topic || item.topics.includes(topic as typeof item.topics[number])) && (!format || item.format === format) && (!query || terms.includes(query.toLowerCase().trim()))
  }), [topic, format, query])

  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.resources}</p><h1>{c.resourcesTitle}</h1><p>{c.resourcesLead}</p></header>
    <p className="directory-comparison-link"><a className="text-link" href="#algebra-to-derivatives">{zh ? '不确定怎么选？比较代数到导数的四条学习资源。' : 'Not sure where to start? Compare four paths from algebra to derivatives.'}</a></p>
    <div className="directory-layout"><aside className="filter-panel" aria-label={zh ? '资源筛选' : 'Resource filters'}><h2>{zh ? '筛选' : 'Filter resources'}</h2>
      <label htmlFor="resource-search">{c.search}</label><input id="resource-search" type="search" value={query} onChange={e => update('q', e.target.value)} placeholder={c.searchPlaceholder} />
      <label htmlFor="topic-filter">{c.topic}</label><select id="topic-filter" value={topic} onChange={e => update('topic', e.target.value)}><option value="">{c.allTopics}</option>{topics.map(item => <option value={item.id} key={item.id}>{zh ? item.zh : item.name}</option>)}</select>
      <label htmlFor="format-filter">{c.format}</label><select id="format-filter" value={format} onChange={e => update('format', e.target.value)}><option value="">{c.allFormats}</option>{formats.map(item => <option value={item} key={item}>{resourceFormat(item, locale)}</option>)}</select>
      {(topic || format || query) && <button className="clear-button" onClick={clear}>{c.clear}</button>}
    </aside><div className="directory-results"><div className="results-heading"><strong role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? c.result : c.results}</strong><span>{zh ? '按名称排序' : 'Sorted by name'}</span></div>{filtered.length ? <div className="directory-grid">{[...filtered].sort((a,b) => a.name.localeCompare(b.name)).map(item => <ResourceCard key={item.id} resource={item} locale={locale} />)}</div> : <p className="empty-state">{c.noResults}</p>}</div></div>
    <ResourceComparison locale={locale} />
    <div className="editorial-note"><h2>{c.editorial}</h2><p>{c.editorialText}</p></div>
  </div>
}
