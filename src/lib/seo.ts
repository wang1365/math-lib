import type { Metadata } from 'next'
import { defaultLocale, locales, type Locale } from '@/config/i18n'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onlymath.org'
export const siteName = 'OnlyMath'

export const localizedPath = (locale: string, path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return locale === defaultLocale ? normalizedPath : `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`
}

export const absoluteUrl = (path = '/') => new URL(path, siteUrl).toString()

export const alternateLanguages = (path = '/') => {
  const entries = locales.map(({ code }) => [code, localizedPath(code, path)] as const)
  return Object.fromEntries([
    ...entries,
    ['x-default', localizedPath(defaultLocale, path)]
  ])
}

export const ogLocaleMap: Record<Locale, string> = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  en: 'en_US',
  fr: 'fr_FR',
  ja: 'ja_JP',
  es: 'es_ES',
  pt: 'pt_PT',
  ko: 'ko_KR',
  ar: 'ar_SA',
  de: 'de_DE'
}

type BuildMetadataOptions = {
  title: string
  description: string
  locale?: string
  path?: string
  keywords?: string[]
}

export function buildPageMetadata({
  title,
  description,
  locale = defaultLocale,
  path = '/',
  keywords = []
}: BuildMetadataOptions): Metadata {
  const canonicalPath = localizedPath(locale, path)
  const imageUrl = absoluteUrl('/opengraph-image')

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: alternateLanguages(path)
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteName}`
        }
      ],
      locale: ogLocaleMap[locale as Locale] || ogLocaleMap[defaultLocale],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  }
}

