import type { Metadata } from 'next'
import { defaultLocale, type Locale } from '@/config/i18n'
import { buildPageMetadata } from '@/lib/seo'
import zhMessages from '@/messages/zh-CN.json'

type SeoPage = 'home' | 'resources' | 'branches' | 'tools' | 'calculator' | 'examples'

const pageConfig: Record<SeoPage, { namespace: string; path: string; keywords: string[] }> = {
  home: {
    namespace: 'common',
    path: '/',
    keywords: ['math resources', 'mathematics learning', 'online math education']
  },
  resources: {
    namespace: 'resources',
    path: '/resources',
    keywords: ['mathematics learning resources', 'free math courses', 'math videos', 'math textbooks']
  },
  branches: {
    namespace: 'branches',
    path: '/branches',
    keywords: ['branches of mathematics', 'algebra', 'calculus', 'geometry', 'statistics']
  },
  tools: {
    namespace: 'tools',
    path: '/tools',
    keywords: ['math tools', 'graphing calculator', 'statistics calculator', 'algebra calculator']
  },
  calculator: {
    namespace: 'calculator',
    path: '/calculator',
    keywords: ['online math calculator', 'scientific calculator', 'math formula calculator']
  },
  examples: {
    namespace: 'examples',
    path: '/examples',
    keywords: ['math examples', 'mathematical formulas', 'calculus examples', 'algebra formulas']
  }
}

const loadMessages = async (locale: string) => {
  try {
    return (await import(`@/messages/${locale}.json`)).default as typeof zhMessages
  } catch {
    return zhMessages
  }
}

export async function buildRouteMetadata(
  page: SeoPage,
  locale: Locale | string = defaultLocale
): Promise<Metadata> {
  const messages = await loadMessages(locale)
  const config = pageConfig[page]
  const namespace = messages[config.namespace as keyof typeof messages] as Record<string, string>
  const common = messages.common

  const title = page === 'home' ? common.siteTitle : namespace.title
  const description = page === 'home'
    ? common.siteDescription
    : namespace.subtitle || common.siteDescription

  return buildPageMetadata({
    title,
    description,
    locale,
    path: config.path,
    keywords: config.keywords
  })
}

