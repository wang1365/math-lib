import AdBanner from '@/app/components/AdBanner'
import Layout from '../components/LayoutIntl';
import { Calculator, BookOpen, Video, Globe, ExternalLink, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function ResourcesPage() {
  const t = await getTranslations('resources')
  const locale = await getLocale()
  const withLocale = (href: string) => {
    const normalized = href.startsWith('/') ? href : `/${href}`
    return locale !== 'zh-CN' ? `/${locale}${normalized}` : normalized
  }
  const resourceCategories = [
    {
      title: t('platforms.title'),
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      resources: [
        {
          name: 'Khan Academy',
          url: 'https://www.khanacademy.org/math',
          description: t('platforms.khan'),
          level: t('levels.beginnerToAdvanced'),
          rating: 5,
          type: t('types.free')
        },
        {
          name: 'MIT OpenCourseWare',
          url: 'http://ocw.mit.edu/courses/mathematics/',
          description: t('platforms.mit'),
          level: t('levels.intermediateToAdvanced'),
          rating: 5,
          type: t('types.free')
        },
        {
          name: 'Coursera',
          url: 'https://www.coursera.org/courses?query=mathematics&languages=en',
          description: t('platforms.coursera'),
          level: t('levels.beginnerToAdvanced'),
          rating: 4,
          type: t('types.paid')
        },
        {
          name: 'edX',
          url: 'https://www.edx.org/course/subject/math',
          description: t('platforms.edx'),
          level: t('levels.beginnerToAdvanced'),
          rating: 4,
          type: t('types.freePaid')
        }
      ]
    },
    {
      title: t('videos.title'),
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      resources: [
        {
          name: '3Blue1Brown',
          url: 'https://www.youtube.com/@3blue1brown',
          description: t('videos.3blue1brown'),
          level: t('levels.intermediateToAdvanced'),
          rating: 5,
          type: t('types.free')
        },
        {
          name: 'Professor Leonard',
          url: 'https://www.youtube.com/@ProfessorLeonard',
          description: t('videos.professorLeonard'),
          level: t('levels.intermediateToAdvanced'),
          rating: 5,
          type: t('types.free')
        },
        {
          name: 'PatrickJMT',
          url: 'https://www.youtube.com/@patrickjmt',
          description: t('videos.patrickjmt'),
          level: t('levels.beginnerToIntermediate'),
          rating: 4,
          type: t('types.free')
        },
        {
          name: 'Mathologer',
          url: 'https://www.youtube.com/@Mathologer',
          description: t('videos.mathologer'),
          level: t('levels.intermediateToAdvanced'),
          rating: 5,
          type: t('types.free')
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
    <Layout locale={locale}>
      <div className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 text-center">
            <AdBanner slot="1234567890" format="horizontal" responsive={true} />
          </div>

          {/* Page Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Resource Categories */}
          <div className="space-y-16">
            {resourceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
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
                              resource.type === t('types.free') ? 'bg-green-100 text-green-800' :
                              resource.type === t('types.paid') ? 'bg-red-100 text-red-800' :
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
                        {t('visitResource')}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <AdBanner slot="3456789012" format="horizontal" responsive={true} />
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('moreResources.title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('moreResources.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={withLocale('/branches')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  {t('moreResources.browseBranches')}
                </Link>
                <Link
                  href={withLocale('/tools')}
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
                >
                  {t('moreResources.viewTools')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
