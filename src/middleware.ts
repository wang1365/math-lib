import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './config/i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales.map(l => l.code),
  
  // Used when no locale matches
  defaultLocale: defaultLocale,
  
  // Locale detection
  localePrefix: 'as-needed',
  
  // Disable locale detection from Accept-Language header
  localeDetection: false
})

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Handle default-locale paths without prefix, excluding API, Next assets and files with extensions
    '/((?!api|_next|.*\..*).*)',
    // Handle explicit locale-prefixed paths
    '/(zh-CN|zh-TW|en|fr|ja|es|pt|ko|ar|de)/:path*'
  ]
}