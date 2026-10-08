import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { comparisonReviewedAt, getResourceComparison } from '@/lib/resourceComparison'
import { localPath } from '@/lib/site-copy'

export default function ResourceComparison({ locale }: { locale: string }) {
  const zh = locale.startsWith('zh')
  const entries = getResourceComparison(locale)
  const labels = zh ? {
    prerequisites: '先修基础', structure: '形式与学习顺序', practice: '练习与答案', feedback: '反馈方式', access: '费用与访问条件', nextStep: '本站建议的下一步',
  } : {
    prerequisites: 'Prerequisites', structure: 'Format and sequence', practice: 'Exercises and answers', feedback: 'Feedback', access: 'Cost and access', nextStep: 'Our suggested next step',
  }
  const reviewedDate = new Intl.DateTimeFormat(zh ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${comparisonReviewedAt}T00:00:00Z`))

  return <section className="resource-comparison section-inner" id="algebra-to-derivatives" aria-labelledby="resource-comparison-title">
    <div className="section-heading"><div>
      <p className="eyebrow accent">{zh ? '具体课程与教材对比' : 'Compare specific courses and books'}</p>
      <h2 id="resource-comparison-title">{zh ? '从代数薄弱，到第一次理解导数。' : 'From shaky algebra to your first derivative.'}</h2>
      <p>{zh ? '先选择适合当前基础的资源，再决定学习形式。下面四种选择解决的是不同阶段的问题，不需要全部学完。' : 'Choose for your current skills first, then your preferred format. These four options serve different stages; you do not need to complete all four.'}</p>
    </div></div>

    <div className="comparison-decision topic-checkpoint">
      <strong>{zh ? '本站的选择建议' : 'Our recommendation'}</strong>
      <p>{zh ? '解方程还不稳：需要自动评分就先用 Khan Academy；喜欢纸笔和详细文字步骤就先用 OpenStax 初等代数。能熟练处理函数和代数后，用 OpenStax 微积分建立完整概念，再按需用 Paul 的讲义补充解题过程。' : 'If equations still feel uncertain, start with Khan Academy for scored practice or OpenStax Elementary Algebra for a paper-and-pencil approach. Once algebra and functions are secure, use OpenStax Calculus for the main explanation and Paul’s notes when you need another worked solution.'}</p>
      <p>{zh ? '中间的桥梁不能省：因式分解、分式、函数符号与图像；完整微积分还需要三角、指数与对数。完成代数 1 并不自动意味着已准备好学微积分。' : 'Keep the bridge in your plan: factoring, rational expressions, function notation, and graphs; a full calculus course also needs trigonometry, exponentials, and logarithms. Completing Algebra 1 alone does not establish calculus readiness.'}</p>
      <Link className="text-link" href={localPath(locale, '/guides')}>{zh ? '查看学习路径与自测建议' : 'See learning paths and readiness checks'}<ArrowUpRight size={16} aria-hidden="true" /></Link>
    </div>

    <div className="comparison-grid directory-grid">
      {entries.map(entry => <article className="comparison-card resource-card" key={entry.id} aria-labelledby={`comparison-${entry.id}`}>
        <p className="eyebrow">{entry.stage}</p>
        <h3 id={`comparison-${entry.id}`}>{entry.name}</h3>
        <p className="resource-summary">{entry.bestFor}</p>
        <dl className="comparison-dimensions resource-details">
          {(Object.keys(labels) as (keyof typeof labels)[]).map(key => <div key={key}>
            <dt><strong>{labels[key]}</strong></dt>
            <dd>{entry[key]}</dd>
          </div>)}
        </dl>
        <a className="text-link card-link" href={entry.start.url} target="_blank" rel="noopener noreferrer" aria-label={`${entry.start.label} (${zh ? '新窗口' : 'opens in a new tab'})`}>{entry.start.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
        <details className="comparison-sources">
          <summary>{zh ? '核查所用的官方来源' : 'Official sources for this comparison'}</summary>
          <ul>{entry.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${source.label} (${zh ? '新窗口' : 'opens in a new tab'})`}>{source.label}<ArrowUpRight size={13} aria-hidden="true" /></a></li>)}</ul>
        </details>
      </article>)}
    </div>

    <p className="comparison-method tool-note">{zh ? '核查日期：' : 'Public materials reviewed: '}<time dateTime={comparisonReviewedAt}>{reviewedDate}</time>{zh ? '（UTC）。对比基于公开课程目录、样章、练习页面和提供方说明；未报名体验、测试账户功能或测量学习效果。适用建议属于 OnlyMath 的编辑判断。这里链接的是英文资源；访问条件可能变化。' : ' (UTC). Based on public course outlines, sample sections, practice pages, and provider documentation. We did not enroll, test account features, or measure learning outcomes. Recommendations are OnlyMath’s editorial judgments. These links lead to English-language resources; access terms can change.'}</p>
  </section>
}
