import Layout from '../components/LayoutIntl';
import { Brain, Hash, Shapes, BarChart3, FunctionSquare, Atom, Network, PieChart } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function BranchesPage() {
  const t = useTranslations('branches');
  
  const mathBranches = [
    {
      title: '基础数学',
      icon: Hash,
      color: 'from-blue-500 to-cyan-500',
      description: '数学的基础分支，为其他数学领域提供基础',
      subcategories: [
        {
          name: '算术',
          description: '数的基本运算和性质',
          resources: ['基础运算', '分数和小数', '百分比']
        },
        {
          name: '代数',
          description: '符号运算和方程求解',
          resources: ['线性方程', '二次方程', '多项式']
        },
        {
          name: '几何',
          description: '形状、大小和空间关系',
          resources: ['平面几何', '立体几何', '三角学']
        }
      ]
    },
    {
      title: '高等数学',
      icon: FunctionSquare,
      color: 'from-purple-500 to-pink-500',
      description: '更深入的数学理论和应用',
      subcategories: [
        {
          name: '微积分',
          description: '变化率和累积量的研究',
          resources: ['导数', '积分', '级数']
        },
        {
          name: '线性代数',
          description: '向量空间和线性变换',
          resources: ['矩阵', '向量', '特征值']
        },
        {
          name: '概率统计',
          description: '数据分析和随机现象',
          resources: ['概率分布', '统计推断', '回归分析']
        }
      ]
    },
    {
      title: '理论数学',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      description: '数学的理论基础和抽象概念',
      subcategories: [
        {
          name: '数学分析',
          description: '极限、连续性和收敛性',
          resources: ['实分析', '复分析', '泛函分析']
        },
        {
          name: '抽象代数',
          description: '代数结构和运算',
          resources: ['群论', '环论', '域论']
        },
        {
          name: '拓扑学',
          description: '空间的性质和变换',
          resources: ['点集拓扑', '代数拓扑', '微分拓扑']
        }
      ]
    },
    {
      title: '应用数学',
      icon: PieChart,
      color: 'from-orange-500 to-red-500',
      description: '数学在实际问题中的应用',
      subcategories: [
        {
          name: '数值分析',
          description: '数值算法和计算方法',
          resources: ['数值积分', '微分方程', '优化算法']
        },
        {
          name: '运筹学',
          description: '优化和决策理论',
          resources: ['线性规划', '动态规划', '博弈论']
        },
        {
          name: '金融数学',
          description: '金融市场的数学模型',
          resources: ['期权定价', '风险管理', '投资组合']
        }
      ]
    },
    {
      title: '离散数学',
      icon: Network,
      color: 'from-indigo-500 to-purple-500',
      description: '离散结构和组合数学',
      subcategories: [
        {
          name: '组合数学',
          description: '计数和排列组合',
          resources: ['排列组合', '生成函数', '图论']
        },
        {
          name: '数论',
          description: '整数性质和算术函数',
          resources: ['素数', '同余', '数论函数']
        },
        {
          name: '逻辑',
          description: '形式逻辑和推理',
          resources: ['命题逻辑', '谓词逻辑', '证明论']
        }
      ]
    },
    {
      title: '数学物理',
      icon: Atom,
      color: 'from-yellow-500 to-orange-500',
      description: '物理学中的数学方法',
      subcategories: [
        {
          name: '微分方程',
          description: '物理现象的数学模型',
          resources: ['常微分方程', '偏微分方程', '边值问题']
        },
        {
          name: '变分法',
          description: '泛函极值问题',
          resources: ['欧拉方程', '哈密顿原理', '最小作用量']
        },
        {
          name: '群论',
          description: '对称性和守恒定律',
          resources: ['李群', '表示论', '规范理论']
        }
      ]
    }
  ]

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              数学分支
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              数学是一个庞大而美妙的学科体系，包含多个相互关联的分支。
              从基础数学到高等数学，从纯理论到实际应用，每个分支都有其独特的魅力和价值。
            </p>
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
                        href={`/branches/${subcategory.name.toLowerCase()}`}
                        className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        了解更多 →
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">学习路径建议</h3>
              <p className="text-gray-600">
                根据你的数学背景和学习目标，选择合适的学习路径
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