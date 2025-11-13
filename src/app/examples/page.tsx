'use client'

import Layout from '../components/LayoutIntl';
import MathFormula from '@/app/components/MathFormula'
import { BookOpen, Calculator, PenTool, Brain } from 'lucide-react'

export default function MathExamplesPage() {
  const mathExamples = [
    {
      title: '二次方程求根公式',
      category: '代数',
      icon: PenTool,
      color: 'from-blue-500 to-cyan-500',
      formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      description: '用于求解一元二次方程的通用公式，其中a、b、c是方程系数。',
      example: '例如：求解 x² - 5x + 6 = 0，其中 a=1, b=-5, c=6'
    },
    {
      title: '欧拉公式',
      category: '复分析',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      formula: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
      description: '连接指数函数与三角函数的重要公式，在复分析中具有核心地位。',
      example: '当 θ = π 时，得到著名的欧拉恒等式：e^{iπ} + 1 = 0'
    },
    {
      title: '勾股定理',
      category: '几何',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      formula: 'a^2 + b^2 = c^2',
      description: '直角三角形两直角边的平方和等于斜边的平方，是几何学的基础定理。',
      example: '如果直角三角形的两条直角边分别为3和4，那么斜边长度为5'
    },
    {
      title: '泰勒展开',
      category: '微积分',
      icon: Calculator,
      color: 'from-orange-500 to-red-500',
      formula: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n',
      description: '将函数在某点附近展开为幂级数，是微积分中的重要工具。',
      example: 'sin(x) 在 x=0 处的泰勒展开：x - x³/3! + x⁵/5! - x⁷/7! + ...'
    },
    {
      title: '高斯积分',
      category: '积分',
      icon: Calculator,
      color: 'from-indigo-500 to-purple-500',
      formula: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
      description: '高斯函数在整个实数轴上的积分，在概率论和统计学中非常重要。',
      example: '这个积分在正态分布的标准化过程中起着关键作用'
    },
    {
      title: '傅里叶变换',
      category: '分析',
      icon: Brain,
      color: 'from-yellow-500 to-orange-500',
      formula: '\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x)e^{-2\\pi ix\\xi} dx',
      description: '将时域信号转换为频域表示，在信号处理和图像处理中广泛应用。',
      example: '用于音频压缩、图像处理和通信系统等领域'
    }
  ]

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              数学公式展示
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              展示一些经典和重要的数学公式，这些公式在数学的发展和应用中具有重要意义。
              通过LaTeX渲染，确保公式的准确性和美观性。
            </p>
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
                    <strong>示例：</strong> {example.example}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LaTeX Examples */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">更多LaTeX示例</h3>
              <p className="text-gray-600">
                展示LaTeX在数学公式渲染中的强大功能
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">矩阵表示</h4>
                <MathFormula 
                  formula="\\begin{bmatrix} a & b \\ c & d \\end{bmatrix}"
                  displayMode="block"
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">极限定义</h4>
                <MathFormula 
                  formula="\\lim_{x \\to \\infty} \\frac{1}{x} = 0"
                  displayMode="block"
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">求和符号</h4>
                <MathFormula 
                  formula="\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}"
                  displayMode="block"
                />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">微分方程</h4>
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