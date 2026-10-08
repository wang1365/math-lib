import { ArrowUpRight } from 'lucide-react'
import { Resource, topics } from '@/lib/catalog'
import { resourceFormat, resourceLevel, siteCopy } from '@/lib/site-copy'

export default function ResourceCard({ resource, locale, compact = false }: { resource: Resource; locale: string; compact?: boolean }) {
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  const checkedDate = resource.checkedAt ? new Intl.DateTimeFormat(zh ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${resource.checkedAt}T00:00:00Z`)) : null
  const topicLabels = resource.topics.slice(0, compact ? 2 : 3).map(id => {
    const topic = topics.find(item => item.id === id)
    return topic ? (zh ? topic.zh : topic.name) : id
  })
  return <article className="resource-card">
    <div className="resource-card-top"><span className="eyebrow">{resourceFormat(resource.format, locale)} · {resource.cost === 'Free' ? c.free : c.freePaid}</span><span className="resource-level">{resourceLevel(resource.level, locale)}</span></div>
    <h3>{resource.name}</h3>
    <p className="resource-summary">{zh ? resource.summaryZh : resource.summary}</p>
    <div className="topic-tags">{topicLabels.map(label => <span key={label}>{label}</span>)}</div>
    {!compact && <div className="resource-details"><p><strong>{c.bestFor}:</strong> {zh ? resource.bestForZh : resource.bestFor}</p><p><strong>{c.keepInMind}:</strong> {zh ? resource.caveatZh : resource.caveat}</p></div>}
    {checkedDate && <p className="resource-checked content-date">{zh ? '资料核查：' : 'Information checked: '}<time dateTime={resource.checkedAt}>{checkedDate}</time></p>}
    <a className="text-link card-link" href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.visit}: ${resource.name} (${zh ? '新窗口' : 'opens in a new tab'})`}>{c.visit}<ArrowUpRight size={16} aria-hidden="true" /></a>
  </article>
}
