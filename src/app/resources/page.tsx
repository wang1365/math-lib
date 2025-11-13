import AdBanner from '@/app/components/AdBanner'
import Layout from '../components/LayoutIntl';
import { Calculator, BookOpen, Video, Globe, ExternalLink, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: '学习平台',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      resources: [
        {
          name: 'Khan Academy',
          url: 'https://www.khanacademy.org/math',
          description: '免费的在线数学课程，从基础数学到高等数学',
          level: '初级到高级',
          rating: 5,
          type: '免费'
        },
        {
          name: 'MIT OpenCourseWare',
          url: 'http://ocw.mit.edu/courses/mathematics/',
          description: '麻省理工学院的开放课程，包含完整的数学课程',
          level: '中级到高级',
          rating: 5,
          type: '免费'
        },
        {
          name: 'Coursera',
          url: 'https://www.coursera.org/courses?query=mathematics&languages=en',
          description: '世界顶级大学的在线数学课程',
          level: '初级到高级',
          rating: 4,
          type: '付费'
        },
        {
          name: 'edX',
          url: 'https://www.edx.org/course/subject/math',
          description: '哈佛和MIT创建的在线教育平台',
          level: '初级到高级',
          rating: 4,
          type: '免费/付费'
        }
      ]
    },
    {
      title: '视频课程',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      resources: [
        {
          name: '3Blue1Brown',
          url: 'https://www.youtube.com/@3blue1brown',
          description: '以可视化方式讲解数学概念，特别适合理解抽象概念',
          level: '中级到高级',
          rating: 5,
          type: '免费'
        },
        {
          name: 'Professor Leonard',
          url: 'https://www.youtube.com/@ProfessorLeonard',
          description: '大学数学课程完整视频，从微积分到高等数学',
          level: '中级到高级',
          rating: 5,
          type: '免费'
        },
        {
          name: 'PatrickJMT',
          url: 'https://www.youtube.com/@patrickjmt',
          description: '清晰的数学问题解答和概念讲解',
          level: '初级到中级',
          rating: 4,
          type: '免费'
        },
        {
          name: 'Mathologer',
          url: 'https://www.youtube.com/@Mathologer',
          description: '探索数学的奇妙世界和有趣问题',
          level: '中级到高级',
          rating: 5,
          type: '免费'
        }
      ]
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <Layout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-8 text-center">
            <AdBanner slot="1234567890" format="horizontal" responsive={true} />
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              数学学习资源
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              精选全球优质的数学学习资源，包括在线课程、视频讲座、数学工具和百科全书。
              从基础数学到高等数学，满足不同学习者的需求。
            </p>
          </div>

          {/* Resource Categories */}
          <div className="space-y-16">
            {resourceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="">
                <div className="flex items-center mb-8">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                </div>
                
                {/* Ad Banner - Middle */}
                <div className="mb-8 text-center">
                  <AdBanner slot="2345678901" format="rectangle" responsive={true} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <div
                      key={resourceIndex}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {resource.level}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              resource.type === '免费' ? 'bg-green-100 text-green-800' :
                              resource.type === '付费' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {resource.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {renderStars(resource.rating)}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        访问资源
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Ad Banner - Bottom */}
          <div className="mt-12 text-center">
            <AdBanner slot="3456789012" format="horizontal" responsive={true} />
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">更多资源</h3>
              <p className="text-gray-600 mb-6">
                探索更多数学学习资源，包括免费教科书、研究论文、数学社区等。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/branches"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  按数学分支浏览
                </Link>
                <Link
                  href="/tools"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
                >
                  查看所有工具
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}