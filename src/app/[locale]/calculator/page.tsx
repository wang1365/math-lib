'use client'
import MathFormula from '@/app/components/MathFormula'
import { useState } from 'react'
import { Calculator, Plus, Minus, X, Divide, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function CalculatorPage() {
  const t = useTranslations('calculator')
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const Button = ({ onClick, children, className = '', variant = 'default' }: {
    onClick: () => void
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'operator' | 'equals' | 'clear'
  }) => {
    const variantClasses = {
      default: 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200',
      operator: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200',
      equals: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
      clear: 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
    }

    return (
      <button
        onClick={onClick}
        className={`h-14 rounded-lg border font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {t('title')}
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <p className="text-gray-500 mt-4">
              {t('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-4">
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="text-right text-white text-3xl font-mono overflow-hidden">
                    {display}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {/* First Row */}
                  <Button onClick={clearAll} variant="clear" className="col-span-2">
                    {t('clear')}
                  </Button>
                  <Button onClick={() => setDisplay(display.slice(0, -1) || '0')} variant="operator">
                    {t('backspace')}
                  </Button>
                  <Button onClick={() => inputOperation('÷')} variant="operator">
                    <Divide className="w-5 h-5 mx-auto" />
                  </Button>

                  {/* Number Rows */}
                  {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']].map((row, rowIndex) => (
                    <div key={rowIndex} className="col-span-4 grid grid-cols-4 gap-3">
                      {row.map(num => (
                        <Button key={num} onClick={() => inputNumber(num)}>
                          {num}
                        </Button>
                      ))}
                      <Button onClick={() => inputOperation(['×', '-', '+'][rowIndex])} variant="operator">
                        {rowIndex === 0 ? <X className="w-5 h-5 mx-auto" /> : 
                         rowIndex === 1 ? <Minus className="w-5 h-5 mx-auto" /> : 
                         <Plus className="w-5 h-5 mx-auto" />}
                      </Button>
                    </div>
                  ))}

                  {/* Last Row */}
                  <Button onClick={() => inputNumber('0')} className="col-span-2">
                    0
                  </Button>
                  <Button onClick={inputDecimal}>
                    .
                  </Button>
                  <Button onClick={performCalculation} variant="equals">
                    {t('equals')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mathematical Formulas
              </h3>
              <div className="space-y-4">
                <MathFormula formula="E = mc^2" />
                <MathFormula formula="a^2 + b^2 = c^2" />
                <MathFormula formula="\frac{-b \pm \sqrt{b^2-4ac}}{2a}" />
                <MathFormula formula="\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}" />
                <MathFormula formula="e^{i\pi} + 1 = 0" />
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Calculator Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use the basic operations: +, -, ×, ÷</li>
                  <li>• Click = to calculate results</li>
                  <li>• Use decimal points for precise calculations</li>
                  <li>• Clear button resets the calculator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  )
}
