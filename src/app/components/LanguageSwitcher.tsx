'use client'

import { usePathname } from 'next/navigation'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { defaultLocale, locales, type Locale } from '@/config/i18n'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const localeFromContext = useLocale()
  const currentLocale = (localeFromContext as Locale) || defaultLocale
  const currentLanguage =
    locales.find(locale => locale.code === currentLocale) ||
    locales.find(locale => locale.code === defaultLocale) ||
    locales[0]

  const localizedHref = (newLocale: Locale) => {
    const localePrefixPattern = /^\/(zh-CN|zh-TW|en|fr|ja|es|pt|ko|ar|de)(?=\/|$)/
    const pathWithoutLocale = pathname.replace(localePrefixPattern, '') || '/'
    const normalizedPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`

    return newLocale === defaultLocale
      ? normalizedPath
      : `/${newLocale}${normalizedPath === '/' ? '' : normalizedPath}`
  }

  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 [&::-webkit-details-marker]:hidden">
        <Globe className="h-4 w-4 shrink-0 text-gray-600" />
        <span className="max-w-24 truncate">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
        {locales.map((locale) => {
          const isActive = locale.code === currentLocale

          return (
            <a
              key={locale.code}
              href={localizedHref(locale.code)}
              hrefLang={locale.code}
              className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="w-6 shrink-0">{locale.flag}</span>
              <span className="min-w-0 flex-1 truncate">{locale.name}</span>
              {isActive && <Check className="h-4 w-4 shrink-0" />}
            </a>
          )
        })}
      </div>
    </details>
  )
}
