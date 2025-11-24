import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './config/i18n'
import type { NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware({
  locales: locales.map(l => l.code),
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true
})

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\..*).*)',
    '/(zh-CN|zh-TW|en|fr|ja|es|pt|ko|ar|de)/:path*'
  ]
}
