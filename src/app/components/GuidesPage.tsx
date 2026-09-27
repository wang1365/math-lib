import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getGuides } from '@/lib/guideContent'
import { resources } from '@/lib/catalog'
import { localPath } from '@/lib/site-copy'

export default function GuidesPage({ locale }: { locale: string }) {
  const guides = getGuides(locale)
  const zh = locale === 'zh-CN'

  return <div className="container-wide page-content">
    <header className="page-heading">
      <p className="eyebrow accent">{zh ? '学习指南' : 'FIELD GUIDES'}</p>
      <h1>{zh ? '找到适合自己的数学学习路径。' : 'Make a plan for learning math.'}</h1>
      <p>{zh ? '从核心概念、学习顺序到资源选择，逐步建立扎实的数学基础。' : 'Practical guidance on what to study, in which order, and how to choose resources that help.'}</p>
    </header>
    <div className="guide-list">
      {guides.map((guide, index) => <article className="guide-article" key={guide.slug} id={guide.slug}>
        <div className="guide-aside"><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {guide.level}</span></div>
        <div className="guide-body">
          <h2>{guide.title}</h2>
          <p className="guide-summary">{guide.summary}</p>
          {guide.sections.map(section => <section key={section.heading}>
            <h3>{section.heading}</h3>
            {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>)}
          <div className="guide-resources">
            <h3>{zh ? '建议搭配的资源' : 'Resources for this path'}</h3>
            <ul>{guide.resourceIds.map(id => {
              const resource = resources.find(item => item.id === id)
              return resource ? <li key={id}><a href={resource.url} target="_blank" rel="noopener noreferrer"><strong>{resource.name}</strong><span>{zh ? resource.bestForZh : resource.bestFor}</span><ArrowUpRight size={16} aria-hidden="true" /></a></li> : null
            })}</ul>
            <Link className="text-link" href={localPath(locale, '/resources')}>{zh ? '比较全部资源' : 'Compare all resources'} <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </article>)}
    </div>
  </div>
}
