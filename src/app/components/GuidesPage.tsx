import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { getGuides } from '@/lib/guideContent'
import { defaultLocale } from '@/config/i18n'

type GuidesPageProps = {
  locale: string
}

export default function GuidesPage({ locale }: GuidesPageProps) {
  const guides = getGuides(locale)
  const isChinese = locale === 'zh-CN' || locale === 'zh-TW'
  const withLocale = (href: string) => {
    const normalized = href.startsWith('/') ? href : `/${href}`
    return locale === defaultLocale ? normalized : `/${locale}${normalized}`
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {isChinese ? '数学学习指南' : 'Math Learning Guides'}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            {isChinese
              ? '围绕数学自学路线、资源选择和核心概念整理的原创指南，帮助你把资源转化为稳定的学习进展。'
              : 'Original guides on math study paths, resource selection, and core concepts so learning resources turn into steady progress.'}
          </p>
        </header>

        <div className="grid gap-6">
          {guides.map(guide => (
            <article key={guide.slug} className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-blue-600">{guide.level}</p>
                  <h2 className="text-2xl font-bold text-gray-900">{guide.title}</h2>
                </div>
              </div>
              <p className="mb-5 text-gray-600">{guide.summary}</p>
              <div className="space-y-5">
                {guide.sections.map(section => (
                  <section key={section.heading}>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{section.heading}</h3>
                    <div className="space-y-2 text-gray-700">
                      {section.body.map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <Link href={withLocale('/resources')} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {isChinese ? '继续浏览配套资源' : 'Continue to related resources'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
