import GuidesPage from '@/app/components/GuidesPage'
import { buildPageMetadata } from '@/lib/seo'

const copy = (locale: string) => locale === 'zh-CN' || locale === 'zh-TW'
  ? {
      title: '数学学习指南',
      description: 'OnlyMath 原创数学学习路线、资源选择方法和核心概念说明。'
    }
  : {
      title: 'Math Learning Guides',
      description: 'Original OnlyMath guides for study paths, resource selection, and core math concepts.'
    }

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = copy(locale)
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/guides',
    keywords: ['math learning guide', 'calculus roadmap', 'linear algebra roadmap']
  })
}

export default async function LocalizedGuidesRoutePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <GuidesPage locale={locale} />
}
