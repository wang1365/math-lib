'use client'

import Layout from '../components/LayoutIntl';
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
      case 'pow':
        return Math.pow(firstValue, secondValue)
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

  const Button = ({ onClick, children, className = '', variant = 'default' }: any) => {
    const baseClasses = 'h-16 rounded-lg font-semibold text-lg transition-all duration-200 active:scale-95'
    const variantClasses = {
      default: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
      operator: 'bg-blue-500 hover:bg-blue-600 text-white',
      equals: 'bg-green-500 hover:bg-green-600 text-white',
      clear: 'bg-red-500 hover:bg-red-600 text-white'
    } as const

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${className}`}
      >
        {children}
      </button>
    )
  }

  const insertConstant = (value: number) => {
    setDisplay(String(value))
    setWaitingForOperand(false)
  }

  const applyUnary = (type: string) => {
    const x = parseFloat(display)
    if (!Number.isFinite(x)) return
    let r = x
    switch (type) {
      case 'sin':
        r = Math.sin(x)
        break
      case 'cos':
        r = Math.cos(x)
        break
      case 'tan':
        r = Math.tan(x)
        break
      case 'log':
        r = Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10
        break
      case 'ln':
        r = Math.log(x)
        break
      case 'sqrt':
        r = Math.sqrt(x)
        break
    }
    setDisplay(String(r))
    setWaitingForOperand(true)
  }

  const startPow = () => {
    const x = parseFloat(display)
    setPreviousValue(x)
    setOperation('pow')
    setWaitingForOperand(true)
  }

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Calculator */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('basic')}</h2>
              
              <div className="max-w-sm mx-auto">
                {/* Display */}
                <div className="bg-gray-900 text-white text-right text-3xl font-mono p-4 rounded-lg mb-4 min-h-[4rem] flex items-center justify-end">
                  {display}
                </div>

                {/* Button Grid */}
                <div className="grid grid-cols-4 gap-2">
                  <Button onClick={clearAll} variant="clear" className="col-span-2">{t('clear')}</Button>
                  <Button onClick={() => setDisplay(display.slice(0, -1) || '0')} variant="operator">
                    {t('backspace')}
                  </Button>
                  <Button onClick={() => inputOperation('÷')} variant="operator">
                    <Divide className="w-5 h-5 mx-auto" />
                  </Button>

                  <Button onClick={() => inputNumber('7')}>7</Button>
                  <Button onClick={() => inputNumber('8')}>8</Button>
                  <Button onClick={() => inputNumber('9')}>9</Button>
                  <Button onClick={() => inputOperation('-')} variant="operator">
                    <Minus className="w-5 h-5 mx-auto" />
                  </Button>

                  <Button onClick={() => inputNumber('4')}>4</Button>
                  <Button onClick={() => inputNumber('5')}>5</Button>
                  <Button onClick={() => inputNumber('6')}>6</Button>
                  <Button onClick={() => inputOperation('+')} variant="operator">
                    <Plus className="w-5 h-5 mx-auto" />
                  </Button>

                  <Button onClick={() => inputNumber('1')}>1</Button>
                  <Button onClick={() => inputNumber('2')}>2</Button>
                  <Button onClick={() => inputNumber('3')}>3</Button>
                  <Button onClick={performCalculation} variant="equals" className="row-span-2">{t('equals')}</Button>

                  <Button onClick={() => inputNumber('0')} className="col-span-2">0</Button>
                  <Button onClick={() => inputNumber('.')}>.</Button>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  <Button onClick={() => insertConstant(Math.PI)} variant="operator">{t('functions.pi')}</Button>
                  <Button onClick={() => insertConstant(Math.E)} variant="operator">{t('functions.e')}</Button>
                  <Button onClick={() => applyUnary('sqrt')} variant="operator">{t('functions.sqrt')}</Button>
                  <Button onClick={() => inputOperation('×')} variant="operator">×</Button>
                  <Button onClick={() => applyUnary('sin')} variant="operator">{t('functions.sin')}</Button>
                  <Button onClick={() => applyUnary('cos')} variant="operator">{t('functions.cos')}</Button>
                  <Button onClick={() => applyUnary('tan')} variant="operator">{t('functions.tan')}</Button>
                  <Button onClick={startPow} variant="operator">{t('functions.pow')}</Button>
                  <Button onClick={() => applyUnary('log')} variant="operator">{t('functions.log')}</Button>
                  <Button onClick={() => applyUnary('ln')} variant="operator">{t('functions.ln')}</Button>
                </div>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">数学公式展示</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">二次方程求根公式</h3>
                  <MathFormula 
                    formula="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
                    displayMode="block"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">勾股定理</h3>
                  <MathFormula 
                    formula="a^2 + b^2 = c^2"
                    displayMode="block"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">欧拉公式</h3>
                  <MathFormula 
                    formula="e^{i\\theta} = \\cos\\theta + i\\sin\\theta"
                    displayMode="block"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">导数定义</h3>
                  <MathFormula 
                    formula="f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}"
                    displayMode="block"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Calculators */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">更多计算器</h3>
              <p className="text-gray-600">我们正在开发更多专业的数学计算器，包括科学计算器、图形计算器、统计计算器等。</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">科学计算器</h4>
                <p className="text-gray-600 text-sm mb-3">支持三角函数、对数函数、复数运算等高级功能</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  开发中
                </span>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Calculator className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">图形计算器</h4>
                <p className="text-gray-600 text-sm mb-3">绘制函数图像，支持多种坐标系和函数类型</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  即将推出
                </span>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Calculator className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">统计计算器</h4>
                <p className="text-gray-600 text-sm mb-3">进行统计分析，计算概率分布和回归分析</p>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                  规划中
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
