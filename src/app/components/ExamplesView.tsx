'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { formulaExamples, type FormulaStep, type FormulaText } from '@/lib/formulaExamples'
import { localPath, siteCopy } from '@/lib/site-copy'
import MathFormula from './MathFormula'

function Step({ step, zh }: { step: FormulaStep; zh: boolean }) {
  return <>
    <p>{zh ? step.text.zh : step.text.en}</p>
    {step.formula && <MathFormula formula={step.formula} displayMode="block" />}
  </>
}

export default function ExamplesView() {
  const locale = useLocale()
  const zh = locale.startsWith('zh')
  const c = siteCopy(locale)
  const text = (value: FormulaText) => zh ? value.zh : value.en

  return <div className="container-wide page-content">
    <header className="page-heading">
      <p className="eyebrow accent">OnlyMath / {c.examples}</p>
      <h1>{c.examplesTitle}</h1>
      <p>{zh
        ? '先检查条件，再理解推导、跟随例题并独立练习。每个公式都附有检验方法、常见误区和可展开的答案。'
        : 'Check the conditions, understand the reasoning, and work through an example. Then try a variation, with checks, common pitfalls, and answers when you need them.'}</p>
    </header>
    <nav className="formula-jump-links" aria-label={zh ? '跳转到公式' : 'Jump to a formula'}>
      {formulaExamples.map(item => <a className="text-link" key={item.slug} href={`#${item.slug}`}>{text(item.title)}</a>)}
    </nav>
    <div className="formula-list">
      {formulaExamples.map((item, index) => <article className="formula-card formula-guide" id={item.slug} aria-labelledby={`${item.slug}-title`} key={item.slug}>
        <div className="formula-heading formula-prose">
          <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {text(item.topic)}</span>
          <h2 id={`${item.slug}-title`}>{text(item.title)}</h2>
          <p>{text(item.use)}</p>
        </div>
        <div className="formula-display"><MathFormula formula={item.formula} displayMode="block" /></div>
        <div className="formula-explanation">
          <section className="formula-prose">
            <h3>{zh ? '先检查适用条件' : 'Check the conditions first'}</h3>
            <ul>{item.conditions.map((condition, i) => <li key={i}>{text(condition)}</li>)}</ul>
          </section>
          <section className="formula-prose">
            <h3>{zh ? '为什么成立' : 'Why it works'}</h3>
            <ol>{item.reasoning.map((step, i) => <li key={i}><Step step={step} zh={zh} /></li>)}</ol>
          </section>
        </div>
        <div className="formula-explanation">
          <section className="formula-prose">
            <h3>{zh ? '逐步例题' : 'Worked example, step by step'}</h3>
            <p><strong>{text(item.worked.problem)}</strong></p>
            <ol>{item.worked.steps.map((step, i) => <li key={i}><Step step={step} zh={zh} /></li>)}</ol>
          </section>
          <section className="formula-prose">
            <h3>{zh ? '检验结果' : 'Check your result'}</h3>
            <Step step={item.check} zh={zh} />
            <h3>{zh ? '避开常见误区' : 'Avoid these pitfalls'}</h3>
            <ul>{item.pitfalls.map((pitfall, i) => <li key={i}>{text(pitfall)}</li>)}</ul>
          </section>
        </div>
        <section className="formula-practice formula-prose">
          <h3>{zh ? '试一试：原创变式练习' : 'Try it: original variation exercises'}</h3>
          <p>{zh ? '先独立完成，再展开答案核对思路。' : 'Attempt each problem before opening the answer. Compare the reasoning as well as the result.'}</p>
          <ol className="formula-exercises">
            {item.exercises.map((exercise, i) => <li key={i}>
              <p>{text(exercise.prompt)}</p>
              {exercise.formula && <MathFormula formula={exercise.formula} displayMode="block" />}
              <details className="formula-answer">
                <summary>{zh ? '答案与思路' : 'Answer and reasoning'}<span className="sr-only">{zh ? `：练习 ${i + 1}` : ` for exercise ${i + 1}`}</span></summary>
                <div>{exercise.answer.map((step, j) => <div key={j}><Step step={step} zh={zh} /></div>)}</div>
              </details>
            </li>)}
          </ol>
        </section>
        <footer className="formula-next-steps">
          <Link className="text-link" href={localPath(locale, item.guidePath)}>{text(item.guideLabel)} →</Link>
          <a className="text-link" href={item.source.url} target="_blank" rel="noopener noreferrer">
            {zh ? '教材延伸阅读（英文）：' : 'Related textbook chapter: '}{item.source.title}<span className="sr-only">{zh ? '（在新标签页打开）' : ' (opens in a new tab)'}</span> ↗
          </a>
        </footer>
      </article>)}
    </div>
  </div>
}
