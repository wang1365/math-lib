'use client'

import { useEffect, useReducer } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { localPath, siteCopy } from '@/lib/site-copy'
import { calculatorKeyboardKey, calculatorReducer, initialCalculatorState } from '@/lib/calculator'

export default function CalculatorView() {
  const locale = useLocale()
  const c = siteCopy(locale)
  const zh = locale === 'zh-CN'
  const [state, press] = useReducer(calculatorReducer, initialCalculatorState)
  const display = state.error === 'divide-by-zero' ? c.calcError
    : state.error === 'overflow' ? (zh ? '结果超出范围' : 'Result out of range') : state.display

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [contenteditable="true"]'))) return
      // Let Enter activate a focused button or link using its native behavior.
      if (event.key === 'Enter' && target instanceof HTMLElement && target.closest('button, a')) return
      const key = calculatorKeyboardKey(event.key)
      if (key) { event.preventDefault(); press(key) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const buttons = ['AC', '⌫', '÷', '×', '7', '8', '9', '−', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.']
  return <div className="container-wide page-content">
    <header className="page-heading"><p className="eyebrow accent">OnlyMath / {c.tools}</p><h1>{c.calcTitle}</h1><p>{c.calcLead}</p></header>
    <div className="calculator-layout">
      <div className="calculator">
        <div className="calculator-display" role="status" aria-live="polite" aria-atomic="true" aria-label={zh ? '计算结果' : 'Calculator display'}>{display}</div>
        {state.error && <p className="calculator-error-hint">{zh ? '输入数字或小数点开始新计算，或按退格、AC 清除。' : 'Enter a number or decimal to start again, or use Backspace or AC to clear.'}</p>}
        <div className="calculator-keys">{buttons.map(value => <button type="button" key={value} className={`calc-key ${value === '=' ? 'equals' : ''} ${value === '0' ? 'zero' : ''}`} onClick={() => press(value)} aria-label={value === '⌫' ? (zh ? '退格' : 'Backspace') : value === 'AC' ? (zh ? '全部清除' : 'Clear all') : value}>{value}</button>)}</div>
      </div>
      <aside className="calculator-help">
        <p className="eyebrow accent">{zh ? '工具说明' : 'About this tool'}</p><h2>{zh ? '先计算，再理解。' : 'A quick check, then back to learning.'}</h2>
        <p>{c.calcTip}</p>
        <ul>
          <li>{zh ? '按键顺序即时计算，不使用乘除优先级：2 + 3 × 4 = 20。' : 'Operations run in button order, without multiplication precedence: 2 + 3 × 4 = 20.'}</li>
          <li>{zh ? '每步结果取约 12 位有效数字，每个输入最多 15 位数字。不能替代精确分数或符号运算。' : 'Each result is rounded to 12 significant digits; each entry accepts up to 15 digits. This is not exact fraction or symbolic arithmetic.'}</li>
          <li>{zh ? '可用数字、+、-、*、/ 和小数点；Enter 求值，Escape 清除，Backspace 退格。聚焦按钮时，Enter 会激活该按钮。' : 'Use digits, +, -, *, / and the decimal point. Enter evaluates, Escape clears and Backspace deletes. When a button is focused, Enter activates that button.'}</li>
        </ul>
        <h3>{zh ? '用斜率检查一个例子' : 'Try a slope check'}</h3>
        <p>{zh ? '直线上两点为 (1, 2) 和 (4, 8)。先手写斜率 (8 − 2) ÷ (4 − 1)，再输入 6 ÷ 3 =，得到 2。计算器只能检查计算；变量与单位仍需要你解释。' : 'For points (1, 2) and (4, 8), write the slope as (8 − 2) ÷ (4 − 1), then enter 6 ÷ 3 = to get 2. The calculator checks the arithmetic; you still need to explain the variables and units.'}</p>
        <Link className="text-link" href={localPath(locale, '/guides/algebra-foundations')}>{zh ? '练习方程与斜率' : 'Practice equations and slope'}</Link>
      </aside>
    </div>
  </div>
}
