'use client'

import Layout from '../components/LayoutIntl';
import { Calculator, FunctionSquare, BarChart3, Atom, Sigma, TrendingUp, PieChart, Grid } from 'lucide-react'
import { useState } from 'react'

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const mathTools = [
    {
      name: '基础计算器',
      icon: Calculator,
      description: '基本的数学运算工具',
      color: 'from-blue-500 to-cyan-500',
      category: '基础工具',
      features: ['四则运算', '百分比计算', '平方根计算']
    },
    {
      name: '函数绘图器',
      icon: FunctionSquare,
      description: '绘制函数图像',
      color: 'from-purple-500 to-pink-500',
      category: '图形工具',
      features: ['2D函数绘图', '参数方程', '极坐标绘图']
    },
    {
      name: '统计计算器',
      icon: BarChart3,
      description: '统计分析工具',
      color: 'from-green-500 to-emerald-500',
      category: '统计工具',
      features: ['描述性统计', '回归分析', '概率分布']
    },
    {
      name: '科学计算器',
      icon: Atom,
      description: '高级科学计算',
      color: 'from-orange-500 to-red-500',
      category: '高级工具',
      features: ['三角函数', '对数函数', '复数运算']
    },
    {
      name: '代数计算器',
      icon: Sigma,
      description: '代数方程求解',
      color: 'from-indigo-500 to-purple-500',
      category: '代数工具',
      features: ['方程求解', '因式分解', '多项式运算']
    },
    {
      name: '微积分工具',
      icon: TrendingUp,
      description: '微积分计算',
      color: 'from-yellow-500 to-orange-500',
      category: '微积分工具',
      features: ['导数计算', '积分计算', '极限计算']
    },
    {
      name: '几何计算器',
      icon: Grid,
      description: '几何计算',
      color: 'from-teal-500 to-cyan-500',
      category: '几何工具',
      features: ['面积计算', '体积计算', '三角函数']
    },
    {
      name: '矩阵计算器',
      icon: PieChart,
      description: '矩阵运算',
      color: 'from-pink-500 to-rose-500',
      category: '线性代数',
      features: ['矩阵乘法', '行列式计算', '逆矩阵']
    }
  ]

  const categories = ['全部', '基础工具', '图形工具', '统计工具', '高级工具', '代数工具', '微积分工具', '几何工具', '线性代数']

  const filteredTools = selectedTool && selectedTool !== '全部' 
    ? mathTools.filter(tool => tool.category === selectedTool)
    : mathTools

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              数学工具
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              强大的数学计算和可视化工具，帮助你更好地理解和应用数学概念。
              从基础计算到高级分析，满足各种数学需求。
            </p>
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
                  <h4 className="font-medium text-gray-900 text-sm">功能特点：</h4>
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
                  使用工具
                </button>
              </div>
            ))}
          </div>

          {/* External Tools Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">推荐外部工具</h3>
              <p className="text-gray-600">
                这些是我们精选的第三方数学工具，功能强大且专业
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">Wolfram Alpha</h4>
                <p className="text-gray-600 text-sm mb-4">计算知识引擎，可以解决各种数学问题</p>
                <a
                  href="https://www.wolframalpha.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  访问网站 →
                </a>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">Desmos</h4>
                <p className="text-gray-600 text-sm mb-4">免费的在线图形计算器，界面友好</p>
                <a
                  href="https://www.desmos.com/calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  访问网站 →
                </a>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">GeoGebra</h4>
                <p className="text-gray-600 text-sm mb-4">动态数学软件，支持几何、代数、统计等</p>
                <a
                  href="https://www.geogebra.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  访问网站 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}