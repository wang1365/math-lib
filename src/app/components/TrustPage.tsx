import { getTrustContent, type TrustPageKey } from '@/lib/trustContent'

export default function TrustPage({ locale, page }: { locale: string; page: TrustPageKey }) {
  const content = getTrustContent(locale, page)
  const zh = locale === 'zh-CN'
  return <div className="container-wide page-content">
    <article className="prose-page">
      <header className="page-heading">
        <p className="eyebrow accent">{page === 'about' ? (zh ? '关于我们' : 'ABOUT') : (zh ? '网站信息' : 'SITE INFORMATION')}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <span className="content-date">{zh ? '更新日期' : 'Updated'}: {content.updated}</span>
      </header>
      <div className="prose-sections">{content.sections.map(section => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>)}</div>
    </article>
  </div>
}
