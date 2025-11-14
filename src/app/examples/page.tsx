'use client'

import Layout from '../components/LayoutIntl';
import MathFormula from '@/app/components/MathFormula'
import { BookOpen, Calculator, PenTool, Brain } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function MathExamplesPage() {
  const t = useTranslations('examples')
  const mathExamples = [
    {
      title: t('examples.quadratic.title'),
      category: t('examples.quadratic.category'),
      icon: PenTool,
      color: 'from-blue-500 to-cyan-500',
      formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      description: t('examples.quadratic.description'),
      example: t('examples.quadratic.example')
    },
    {
      title: t('examples.euler.title'),
      category: t('examples.euler.category'),
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      formula: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
      description: t('examples.euler.description'),
      example: t('examples.euler.example')
    },
    {
      title: t('examples.pythagorean.title'),
      category: t('examples.pythagorean.category'),
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      formula: 'a^2 + b^2 = c^2',
      description: t('examples.pythagorean.description'),
      example: t('examples.pythagorean.example')
    },
    {
      title: t('examples.taylor.title'),
      category: t('examples.taylor.category'),
      icon: Calculator,
      color: 'from-orange-500 to-red-500',
      formula: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n',
      description: t('examples.taylor.description'),
      example: t('examples.taylor.example')
    },
    {
      title: t('examples.gaussian.title'),
      category: t('examples.gaussian.category'),
      icon: Calculator,
      color: 'from-indigo-500 to-purple-500',
      formula: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
      description: t('examples.gaussian.description'),
      example: t('examples.gaussian.example')
    },
    {
      title: t('examples.fourier.title'),
      category: t('examples.fourier.category'),
      icon: Brain,
      color: 'from-yellow-500 to-orange-500',
      formula: '\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x)e^{-2\\pi ix\\xi} dx',
      description: t('examples.fourier.description'),
      example: t('examples.fourier.example')
    }
  ]

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>

          {/* Math Examples Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mathExamples.map((example, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${example.color} flex items-center justify-center mr-4`}>
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                    <span className="text-sm text-gray-500">{example.category}</span>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <MathFormula formula={example.formula} displayMode="block" />
                </div>

                <p className="text-gray-600 mb-3">{example.description}</p>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>{t('example')}：</strong> {example.example}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LaTeX Examples */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('latex.title')}</h3>
              <p className="text-gray-600">{t('latex.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">{t('latex.matrix')}</h4>
                <MathFormula 
                  formula="\\begin{bmatrix} a & b \\ c & d \\end{bmatrix}"
                  displayMode="block"
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">{t('latex.limit')}</h4>
                <MathFormula 
                  formula="\\lim_{x \\to \\infty} \\frac{1}{x} = 0"
                  displayMode="block"
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">{t('latex.summation')}</h4>
                <MathFormula 
                  formula="\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}"
                  displayMode="block"
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">{t('latex.differential')}</h4>
                <MathFormula 
                  formula="\\frac{dy}{dx} + P(x)y = Q(x)"
                  displayMode="block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}