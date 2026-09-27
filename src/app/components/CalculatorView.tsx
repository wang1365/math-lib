'use client'

import { useCallback, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { siteCopy } from '@/lib/site-copy'

type Operation = '+' | '−' | '×' | '÷'

function calculate(a: number, b: number, op: Operation) {
  if (op === '+') return a + b
  if (op === '−') return a - b
  if (op === '×') return a * b
  return b === 0 ? null : a / b
}

export default function CalculatorView() {
  const locale = useLocale()
  const c = siteCopy(locale)
  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState<number | null>(null)
  const [operation, setOperation] = useState<Operation | null>(null)
  const [fresh, setFresh] = useState(false)

  const press = useCallback((value: string) => {
    if (value === 'AC') { setDisplay('0'); setPrevious(null); setOperation(null); setFresh(false); return }
    if (value === '⌫') { setDisplay(current => current.length > 1 ? current.slice(0, -1) : '0'); return }
    if (/^\d$/.test(value)) { setDisplay(current => fresh || current === '0' || current === c.calcError ? value : current + value); setFresh(false); return }
    if (value === '.') { setDisplay(current => fresh ? '0.' : current.includes('.') ? current : `${current}.`); setFresh(false); return }
    if (['+', '−', '×', '÷'].includes(value)) {
      const next = value as Operation
      if (previous !== null && operation && !fresh) { const result = calculate(previous, Number(display), operation); if (result === null) { setDisplay(c.calcError); setPrevious(null); setOperation(null); return }; setDisplay(String(Number(result.toPrecision(12)))); setPrevious(result) }
      else setPrevious(Number(display))
      setOperation(next); setFresh(true); return
    }
    if (value === '=' && previous !== null && operation) { const result = calculate(previous, Number(display), operation); setDisplay(result === null ? c.calcError : String(Number(result.toPrecision(12)))); setPrevious(null); setOperation(null); setFresh(true) }
  }, [c.calcError, display, fresh, operation, previous])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return
      const mapped: Record<string, string> = { Backspace: '⌫', Escape: 'AC', Enter: '=', '*': '×', '/': '÷', '-': '−' }
      const key = mapped[event.key] || event.key
      if (/^\d$/.test(key) || ['.', '+', '−', '×', '÷', '=', '⌫', 'AC'].includes(key)) { event.preventDefault(); press(key) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [press])

  const buttons = ['AC', '⌫', '÷', '×', '7', '8', '9', '−', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.']
  return <div className="container-wide page-content"><header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.tools}</p><h1>{c.calcTitle}</h1><p>{c.calcLead}</p></header><div className="calculator-layout"><div className="calculator"><div className="calculator-display" role="status" aria-live="polite" aria-label={locale.startsWith('zh') ? '计算结果' : 'Calculator display'}>{display}</div><div className="calculator-keys">{buttons.map(value => <button type="button" key={value} className={`calc-key ${value === '=' ? 'equals' : ''} ${value === '0' ? 'zero' : ''}`} onClick={() => press(value)} aria-label={value === '⌫' ? (locale.startsWith('zh') ? '退格' : 'Backspace') : value === 'AC' ? (locale.startsWith('zh') ? '全部清除' : 'Clear all') : value}>{value}</button>)}</div></div><aside className="calculator-help"><p className="eyebrow accent">{locale.startsWith('zh') ? '工具说明' : 'About this tool'}</p><h2>{locale.startsWith('zh') ? '先计算，再理解。' : 'A quick check, then back to learning.'}</h2><p>{c.calcTip}</p></aside></div></div>
}
