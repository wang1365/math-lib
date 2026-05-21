'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { defaultLocale, locales, type Locale } from '@/config/i18n'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const localeFromContext = useLocale()
  const currentLocale = (localeFromContext as Locale) || defaultLocale

  const localizedHref = (newLocale: Locale) => {
    const localePrefixPattern = /^\/(zh-CN|zh-TW|en|fr|ja|es|pt|ko|ar|de)(?=\/|$)/
    const pathWithoutLocale = pathname.replace(localePrefixPattern, '') || '/'
    const normalizedPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`

    return newLocale === defaultLocale
      ? normalizedPath
      : `/${newLocale}${normalizedPath === '/' ? '' : normalizedPath}`
  }

  const switchLocale = (newLocale: Locale) => {
    const href = localizedHref(newLocale)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    window.location.href = new URL(href, window.location.origin).toString()
  }

  return (
    <div className="flex items-center gap-2">
      <label className="relative flex items-center">
        <Globe className="pointer-events-none absolute left-3 h-4 w-4 text-gray-600" />
        <select
          value={currentLocale}
          aria-label="Select language"
          onChange={(event) => switchLocale(event.target.value as Locale)}
          className="h-10 w-40 rounded-lg border border-gray-200 bg-white/80 pl-9 pr-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {locales.map((locale) => (
            <option key={locale.code} value={locale.code}>
              {locale.flag} {locale.name}
            </option>
          ))}
        </select>
      </label>

      <div className="hidden lg:flex items-center gap-1">
        {locales
          .filter(locale => locale.code !== currentLocale)
          .slice(0, 3)
          .map(locale => (
            <Link
              key={locale.code}
              href={localizedHref(locale.code)}
              hrefLang={locale.code}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${locale.code}; path=/; max-age=31536000; SameSite=Lax`
              }}
              className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              {locale.flag}
            </Link>
          ))}
      </div>
    </div>
  )
}
