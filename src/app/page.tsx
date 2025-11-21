import { getTranslations, getLocale } from 'next-intl/server';
import AdBanner from '@/app/components/AdBanner';
import Layout from './components/LayoutIntl';
import { Calculator, BookOpen, Video, Globe, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const t = await getTranslations('home');
  const locale = await getLocale();
  const withLocale = (href: string) => {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    return locale !== 'zh-CN' ? `/${locale}${normalized}` : normalized;
  };
  
  const features = [
    {
      icon: BookOpen,
      title: t('features.resources.title'),
      description: t('features.resources.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calculator,
      title: t('features.tools.title'),
      description: t('features.tools.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Video,
      title: t('features.videos.title'),
      description: t('features.videos.description'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: t('features.encyclopedia.title'),
      description: t('features.encyclopedia.description'),
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: t('features.community.title'),
      description: t('features.community.description'),
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Sparkles,
      title: t('features.recommendations.title'),
      description: t('features.recommendations.description'),
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const popularResources = [
    {
      category: t('resources.platforms.title'),
      items: [
        { name: 'Khan Academy', url: 'https://www.khanacademy.org/math', description: t('resources.platforms.khan') },
        { name: 'MIT OpenCourseWare', url: 'http://ocw.mit.edu/courses/mathematics/', description: t('resources.platforms.mit') },
        { name: '3Blue1Brown', url: 'https://www.youtube.com/@3blue1brown', description: t('resources.platforms.3blue1brown') }
      ]
    },
    {
      category: t('resources.tools.title'),
      items: [
        { name: 'Wolfram Alpha', url: 'http://www.wolframalpha.com/', description: t('resources.tools.wolfram') },
        { name: 'Desmos', url: 'https://www.desmos.com/calculator', description: t('resources.tools.desmos') },
        { name: 'GeoGebra', url: 'https://www.geogebra.org/', description: t('resources.tools.geogebra') }
      ]
    }
  ];

  return (
    <Layout locale={locale}>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title1')}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={withLocale('/resources')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {t('hero.cta.start')}
              </Link>
              <Link
                href={withLocale('/branches')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                {t('hero.cta.branches')}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="mb-8 text-center">
            <AdBanner slot="4182268685" format="auto" responsive={true} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('resources.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('resources.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {popularResources.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {t('resources.visit')} →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={withLocale('/resources')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              {t('cta.explore')}
            </Link>
            <Link
              href={withLocale('/branches')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              {t('cta.branches')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}