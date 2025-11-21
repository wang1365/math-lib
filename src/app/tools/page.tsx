'use client'

import Layout from '../components/LayoutIntl';
import AdBanner from '@/app/components/AdBanner'
import { Calculator, FunctionSquare, BarChart3, Atom, Sigma, TrendingUp, PieChart, Grid } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ToolsPage() {
  const t = useTranslations('tools')
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const mathTools = [
    {
      name: t('basicCalculator.name'),
      icon: Calculator,
      description: t('basicCalculator.description'),
      color: 'from-blue-500 to-cyan-500',
      category: t('basicCalculator.category'),
      features: [
        t('basicCalculator.features.arithmetic'),
        t('basicCalculator.features.percentage'),
        t('basicCalculator.features.sqrt')
      ]
    },
    {
      name: t('functionPlotter.name'),
      icon: FunctionSquare,
      description: t('functionPlotter.description'),
      color: 'from-purple-500 to-pink-500',
      category: t('functionPlotter.category'),
      features: [
        t('functionPlotter.features.2dPlotting'),
        t('functionPlotter.features.parametric'),
        t('functionPlotter.features.polar')
      ]
    },
    {
      name: t('statisticsCalculator.name'),
      icon: BarChart3,
      description: t('statisticsCalculator.description'),
      color: 'from-green-500 to-emerald-500',
      category: t('statisticsCalculator.category'),
      features: [
        t('statisticsCalculator.features.descriptive'),
        t('statisticsCalculator.features.regression'),
        t('statisticsCalculator.features.distributions')
      ]
    },
    {
      name: t('scientificCalculator.name'),
      icon: Atom,
      description: t('scientificCalculator.description'),
      color: 'from-orange-500 to-red-500',
      category: t('scientificCalculator.category'),
      features: [
        t('scientificCalculator.features.trigonometric'),
        t('scientificCalculator.features.logarithmic'),
        t('scientificCalculator.features.complex')
      ]
    },
    {
      name: t('algebraCalculator.name'),
      icon: Sigma,
      description: t('algebraCalculator.description'),
      color: 'from-indigo-500 to-purple-500',
      category: t('algebraCalculator.category'),
      features: [
        t('algebraCalculator.features.equations'),
        t('algebraCalculator.features.factorization'),
        t('algebraCalculator.features.polynomials')
      ]
    },
    {
      name: t('calculusTools.name'),
      icon: TrendingUp,
      description: t('calculusTools.description'),
      color: 'from-yellow-500 to-orange-500',
      category: t('calculusTools.category'),
      features: [
        t('calculusTools.features.derivatives'),
        t('calculusTools.features.integrals'),
        t('calculusTools.features.limits')
      ]
    },
    {
      name: t('geometryCalculator.name'),
      icon: Grid,
      description: t('geometryCalculator.description'),
      color: 'from-teal-500 to-cyan-500',
      category: t('geometryCalculator.category'),
      features: [
        t('geometryCalculator.features.area'),
        t('geometryCalculator.features.volume'),
        t('geometryCalculator.features.trigonometry')
      ]
    },
    {
      name: t('matrixCalculator.name'),
      icon: PieChart,
      description: t('matrixCalculator.description'),
      color: 'from-pink-500 to-rose-500',
      category: t('matrixCalculator.category'),
      features: [
        t('matrixCalculator.features.multiplication'),
        t('matrixCalculator.features.determinant'),
        t('matrixCalculator.features.inverse')
      ]
    }
  ]

  const categories = [
    t('filter.all'),
    t('basicCalculator.category'),
    t('functionPlotter.category'),
    t('statisticsCalculator.category'),
    t('scientificCalculator.category'),
    t('algebraCalculator.category'),
    t('calculusTools.category'),
    t('geometryCalculator.category'),
    t('matrixCalculator.category')
  ]

  const filteredTools = selectedTool && selectedTool !== t('filter.all')
    ? mathTools.filter(tool => tool.category === selectedTool)
    : mathTools

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          <div className="mb-8 text-center">
            <AdBanner slot="2000000002" format="horizontal" responsive={true} />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedTool(category === '全部' ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    (selectedTool === category) || (selectedTool === null && category === '全部')
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredTools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 text-sm">{t('features')}：</h4>
                  <ul className="space-y-1">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
                  {t('useTool')}
                </button>
              </div>
            ))}
          </div>

          {/* External Tools Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('external.title')}</h3>
              <p className="text-gray-600">
                {t('external.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">Wolfram Alpha</h4>
                <p className="text-gray-600 text-sm mb-4">{t('external.wolfram')}</p>
                <a
                  href="https://www.wolframalpha.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  {t('external.visit')} →
                </a>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">Desmos</h4>
                <p className="text-gray-600 text-sm mb-4">{t('external.desmos')}</p>
                <a
                  href="https://www.desmos.com/calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  {t('external.visit')} →
                </a>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">GeoGebra</h4>
                <p className="text-gray-600 text-sm mb-4">{t('external.geogebra')}</p>
                <a
                  href="https://www.geogebra.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  {t('external.visit')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}