import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from './config/i18n'

const handleLocale = createMiddleware({
  locales: locales.map(item => item.code),
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
})

export default function proxy(request: NextRequest) {
  const response = handleLocale(request)
  const rewrite = response.headers.get('x-middleware-rewrite')
  // This repository already has real unprefixed English routes in (default).
  // Let those routes render directly instead of taking an unnecessary /en hop,
  // which can re-enter locale canonicalization as a self-redirect in Next 16.
  // Keep next-intl's negotiation, request headers, cookies and alternates.
  if (response.ok && rewrite && !/^\/(en|zh-CN)(?=\/|$)/.test(request.nextUrl.pathname)
    && /^\/en(?=\/|$)/.test(new URL(rewrite).pathname)) {
    const headers = new Headers(response.headers)
    headers.delete('x-middleware-rewrite')
    return NextResponse.next({ headers })
  }
  return response
}

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
