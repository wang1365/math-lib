'use client'

// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathFormulaProps {
  formula: string
  displayMode?: 'inline' | 'block'
  className?: string
}

export default function MathFormula({ 
  formula, 
  displayMode = 'inline',
  className = ''
}: MathFormulaProps) {
  if (displayMode === 'block') {
    return <BlockMath math={formula} className={className} />
  }
  
  return <InlineMath math={formula} className={className} />
}