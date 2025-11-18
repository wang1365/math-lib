import Layout from '../components/LayoutIntl';
import { Brain, Hash, Shapes, BarChart3, FunctionSquare, Atom, Network, PieChart } from 'lucide-react'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function BranchesPage() {
  const t = await getTranslations('branches');
  const locale = await getLocale();
  const withLocale = (href: string) => {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    return locale !== 'zh-CN' ? `/${locale}${normalized}` : normalized;
  };
  
  const mathBranches = [
    {
      title: t('basic.title'),
      icon: Hash,
      color: 'from-blue-500 to-cyan-500',
      description: t('basic.description'),
      subcategories: [
        {
          name: t('basic.arithmetic'),
          description: t('basic.arithmeticDesc'),
          resources: [t('basic.arithmetic1'), t('basic.arithmetic2'), t('basic.arithmetic3')]
        },
        {
          name: t('basic.algebra'),
          description: t('basic.algebraDesc'),
          resources: [t('basic.algebra1'), t('basic.algebra2'), t('basic.algebra3')]
        },
        {
          name: t('basic.geometry'),
          description: t('basic.geometryDesc'),
          resources: [t('basic.geometry1'), t('basic.geometry2'), t('basic.geometry3')]
        }
      ]
    },
    {
      title: t('advanced.title'),
      icon: FunctionSquare,
      color: 'from-purple-500 to-pink-500',
      description: t('advanced.description'),
      subcategories: [
        {
          name: t('advanced.calculus'),
          description: t('advanced.calculusDesc'),
          resources: [t('advanced.calculus1'), t('advanced.calculus2'), t('advanced.calculus3')]
        },
        {
          name: t('advanced.linearAlgebra'),
          description: t('advanced.linearAlgebraDesc'),
          resources: [t('advanced.linearAlgebra1'), t('advanced.linearAlgebra2'), t('advanced.linearAlgebra3')]
        },
        {
          name: t('advanced.statistics'),
          description: t('advanced.statisticsDesc'),
          resources: [t('advanced.statistics1'), t('advanced.statistics2'), t('advanced.statistics3')]
        }
      ]
    },
    {
      title: t('applied.title'),
      icon: PieChart,
      color: 'from-orange-500 to-red-500',
      description: t('applied.description'),
      subcategories: [
        {
          name: t('applied.optimization'),
          description: t('applied.optimizationDesc'),
          resources: [t('applied.optimization1'), t('applied.optimization2'), t('applied.optimization3')]
        },
        {
          name: t('applied.numerical'),
          description: t('applied.numericalDesc'),
          resources: [t('applied.numerical1'), t('applied.numerical2'), t('applied.numerical3')]
        },
        {
          name: t('applied.modeling'),
          description: t('applied.modelingDesc'),
          resources: [t('applied.modeling1'), t('applied.modeling2'), t('applied.modeling3')]
        }
      ]
    },
    {
      title: t('theoretical.title'),
      icon: Atom,
      color: 'from-orange-500 to-red-500',
      description: t('theoretical.description'),
      subcategories: [
        {
          name: t('theoretical.analysis'),
          description: t('theoretical.analysisDesc'),
          resources: [t('theoretical.analysis1'), t('theoretical.analysis2'), t('theoretical.analysis3')]
        },
        {
          name: t('theoretical.algebra'),
          description: t('theoretical.algebraDesc'),
          resources: [t('theoretical.algebra1'), t('theoretical.algebra2'), t('theoretical.algebra3')]
        },
        {
          name: t('theoretical.topology'),
          description: t('theoretical.topologyDesc'),
          resources: [t('theoretical.topology1'), t('theoretical.topology2'), t('theoretical.topology3')]
        }
      ]
    }
  ]

  return (
    <Layout locale={locale}>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>

          {/* Math Branches */}
          <div className="space-y-16">
            {mathBranches.map((branch, branchIndex) => (
              <div key={branchIndex} className="">
                <div className="flex items-center mb-8">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${branch.color} flex items-center justify-center mr-4`}>
                    <branch.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{branch.title}</h2>
                    <p className="text-gray-600">{branch.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {branch.subcategories.map((subcategory, subcategoryIndex) => (
                    <div
                      key={subcategoryIndex}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{subcategory.name}</h3>
                      <p className="text-gray-600 mb-4">{subcategory.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 text-sm">主要内容包括：</h4>
                        <ul className="space-y-1">
                          {subcategory.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href={withLocale(`/branches/${subcategory.name.toLowerCase()}`)}
                        className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        {t('exploreResources')} →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Learning Path */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('learningPath.title')}</h3>
              <p className="text-gray-600">
                {t('learningPath.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">初学者路径</h4>
                <p className="text-gray-600 text-sm mb-3">从零开始学习数学</p>
                <div className="space-y-1 text-sm">
                  <div className="text-blue-600">1. 基础算术</div>
                  <div className="text-blue-600">2. 初级代数</div>
                  <div className="text-blue-600">3. 基础几何</div>
                  <div className="text-blue-600">4. 三角函数</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">进阶路径</h4>
                <p className="text-gray-600 text-sm mb-3">深入学习高等数学</p>
                <div className="space-y-1 text-sm">
                  <div className="text-purple-600">1. 微积分</div>
                  <div className="text-purple-600">2. 线性代数</div>
                  <div className="text-purple-600">3. 概率统计</div>
                  <div className="text-purple-600">4. 微分方程</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">专业路径</h4>
                <p className="text-gray-600 text-sm mb-3">数学专业研究方向</p>
                <div className="space-y-1 text-sm">
                  <div className="text-green-600">1. 实分析</div>
                  <div className="text-green-600">2. 抽象代数</div>
                  <div className="text-green-600">3. 拓扑学</div>
                  <div className="text-green-600">4. 数论</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}