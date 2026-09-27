import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './config/i18n'

export default createMiddleware({
  locales: locales.map(item => item.code),
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
})

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
