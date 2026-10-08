import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { GuideLesson, LessonProblem } from '@/lib/guideLessons'
import { localPath } from '@/lib/site-copy'
import MathFormula from './MathFormula'
import LessonDiagram from './LessonDiagram'

function Equation({ value }: { value?: string }) {
  return value ? <div className="lesson-math"><MathFormula formula={value} displayMode="block" /></div> : null
}

function Problem({ problem, locale, number, level = 'h3' }: { problem: LessonProblem; locale: string; number: number; level?: 'h3' | 'h4' }) {
  const zh = locale === 'zh-CN'
  const Heading = level
  return <article className="lesson-problem" id={problem.id}>
    <Heading>{zh ? `练习 ${number}` : `Question ${number}`}</Heading>
    <p>{problem.prompt}</p>
    <Equation value={problem.equation} />
    <details className="lesson-answer">
      <summary>{zh ? '答案、思路与错因' : 'Answer, reasoning and error check'}<span className="sr-only">{zh ? `：练习 ${number}` : ` for question ${number}`}</span></summary>
      <div>
        <p><strong>{zh ? '答案：' : 'Answer: '}</strong>{problem.answer}</p>
        <p>{problem.explanation}</p>
        {problem.diagram && <LessonDiagram diagram={problem.diagram} locale={locale} />}
        <p className="lesson-mistake"><strong>{zh ? '常见错误：' : 'Common mistake: '}</strong>{problem.commonMistake}</p>
        <a className="text-link" href={`#${problem.reviewChapterId}`}>{zh ? '需要补习？回到对应章节' : 'Need a review? Go to the matching chapter'} <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </details>
  </article>
}

export default function GuideLessonContent({ locale, lesson }: { locale: string; lesson: GuideLesson }) {
  const zh = locale === 'zh-CN'
  const labels = {
    overview: zh ? '目标与先修基础' : 'Goals and prerequisites',
    diagnostic: zh ? '先做诊断题' : 'Start with the diagnostic',
    route: zh ? '按结果选择起点' : 'Choose your starting point',
    mastery: zh ? '综合验收' : 'Mixed mastery check',
    next: zh ? '下一步与编辑说明' : 'Next steps and editorial notes',
  }

  return <div className="container-wide page-content lesson-page">
    <nav className="lesson-breadcrumbs" aria-label={zh ? '当前位置' : 'Breadcrumb'}>
      <Link href={localPath(locale, '/')}>{zh ? '首页' : 'Home'}</Link><span aria-hidden="true">/</span>
      <Link href={localPath(locale, '/guides')}>{zh ? '学习指南' : 'Guides'}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{lesson.level}</span>
    </nav>
    <header className="page-heading">
      <p className="eyebrow accent">OnlyMath / {zh ? '原创学习单元' : 'Original learning unit'}</p>
      <h1>{lesson.title}</h1>
      <p>{lesson.summary}</p>
      <p className="lesson-meta">{lesson.level} · {zh ? '附原创自测与可展开的答案' : 'Original self-checks with answers you can reveal'}</p>
    </header>
    <div className="lesson-layout">
      <nav className="lesson-toc" aria-label={zh ? '本单元目录' : 'In this unit'}>
        <h2>{zh ? '本单元目录' : 'In this unit'}</h2>
        <ol>
          <li><a href="#overview">{labels.overview}</a></li>
          <li><a href="#diagnostic">{labels.diagnostic}</a></li>
          <li><a href="#choose-path">{labels.route}</a></li>
          {lesson.chapters.map(chapter => <li key={chapter.id}><a href={`#${chapter.id}`}>{chapter.title}</a></li>)}
          <li><a href="#mastery">{labels.mastery}</a></li>
          <li><a href="#next-steps">{labels.next}</a></li>
        </ol>
      </nav>
      <div className="lesson-main">
        <section className="lesson-section" id="overview">
          <h2>{labels.overview}</h2>
          <p>{lesson.audience}</p><p>{lesson.scope}</p>
          <div className="lesson-goals">
            <div><h3>{zh ? '先修基础' : 'Bring these skills'}</h3><ul>{lesson.prerequisites.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>{zh ? '完成后的目标' : 'What you will be able to do'}</h3><ul>{lesson.goals.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <p className="lesson-checkpoint">{lesson.studyPlan}</p>
        </section>
        <section className="lesson-section lesson-diagnostic" id="diagnostic">
          <h2>{labels.diagnostic}</h2><p>{lesson.diagnosticIntro}</p>
          {lesson.diagnostic.map((problem, i) => <Problem key={problem.id} problem={problem} locale={locale} number={i + 1} />)}
        </section>
        <section className="lesson-section" id="choose-path">
          <h2>{labels.route}</h2>
          {lesson.routes.map(route => <div className="lesson-route" key={route.title}>
            <h3>{route.title}</h3><p><strong>{route.when}</strong></p><p>{route.action}</p>
            <a className="text-link" href={`#${route.chapterId}`}>{zh ? '前往复习章节' : 'Go to this chapter'} <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>)}
        </section>
        {lesson.chapters.map((chapter, i) => <section className="lesson-chapter" key={chapter.id} id={chapter.id}>
          <p className="eyebrow accent">{zh ? `第 ${i + 1} 章` : `Chapter ${i + 1}`}</p>
          <h2>{chapter.title}</h2><p className="lesson-goal"><strong>{zh ? '目标：' : 'Goal: '}</strong>{chapter.goal}</p>
          {chapter.explanation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="lesson-example">
            <p className="eyebrow">{zh ? '分步例题' : 'Worked example'}</p><h3>{chapter.example.title}</h3><p>{chapter.example.prompt}</p>
            <Equation value={chapter.example.equation} />
            <ol className="lesson-steps">{chapter.example.steps.map((step, index) => <li key={index}><p>{step.text}</p><Equation value={step.equation} /></li>)}</ol>
            <p><strong>{chapter.example.conclusion}</strong></p>
            {chapter.example.diagram && <LessonDiagram diagram={chapter.example.diagram} locale={locale} />}
          </div>
          <p className="lesson-mistake"><strong>{zh ? '避开误区：' : 'Avoid this trap: '}</strong>{chapter.pitfall}</p>
          <section className="lesson-practice" aria-labelledby={`${chapter.id}-practice`}>
            <h3 id={`${chapter.id}-practice`}>{zh ? '独立练习' : 'Practice on your own'}</h3>
            {chapter.practice.map((problem, index) => <Problem key={problem.id} problem={problem} locale={locale} number={index + 1} level="h4" />)}
          </section>
          <p className="lesson-checkpoint"><strong>{zh ? '继续前的检查：' : 'Before moving on: '}</strong>{chapter.checkpoint}</p>
          <aside className="lesson-sources" aria-labelledby={`${chapter.id}-sources`}>
            <h3 id={`${chapter.id}-sources`}>{zh ? '对应教材章节' : 'Related textbook sections'}</h3>
            <ul>{chapter.sources.map(source => <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only">{zh ? '（在新标签页打开）' : ' (opens in a new tab)'}</span> ↗</a>
              <p>{source.use}<br />{source.language} · {zh ? '链接核查：' : 'Link checked: '}<time dateTime={source.checkedAt}>{source.checkedAt}</time></p>
            </li>)}</ul>
          </aside>
        </section>)}
        <section className="lesson-section" id="mastery">
          <h2>{labels.mastery}</h2><p>{lesson.masteryIntro}</p>
          {lesson.mastery.map((problem, i) => <Problem key={problem.id} problem={problem} locale={locale} number={i + 1} />)}
          <p className="lesson-checkpoint">{lesson.masteryRule}</p>
        </section>
        <section className="lesson-section" id="next-steps">
          <h2>{zh ? '选择下一步' : 'Choose your next step'}</h2>
          <div className="lesson-next">{lesson.nextSteps.map(step => <article key={step.href}><h3>{step.title}</h3><p>{step.body}</p><Link className="text-link" href={localPath(locale, step.href)}>{step.linkLabel} <ArrowUpRight size={15} aria-hidden="true" /></Link></article>)}</div>
          <h3>{zh ? '编辑说明与纠错' : 'Editorial note and corrections'}</h3><p>{lesson.editorialNote}</p>
          <Link className="text-link" href={localPath(locale, '/contact')}>{zh ? '发现错误？请提供本页与题号' : 'Found an error? Send the page and question number'} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </section>
      </div>
    </div>
  </div>
}
