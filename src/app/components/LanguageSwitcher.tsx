'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { Globe } from 'lucide-react'
import { locales, type Locale } from '@/config/i18n'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const localeFromContext = useLocale()
  const [isPending, startTransition] = useTransition()
  
  const currentLocale = (localeFromContext as Locale) || 'zh-CN'

  const handleLanguageChange = (newLocale: Locale) => {
    startTransition(() => {
      // Remove only a valid locale prefix from the pathname
      const localePrefixPattern = /^\/(zh-CN|zh-TW|en|fr|ja|es|pt|ko|ar|de)(?=\/|$)/
      const pathWithoutLocale = pathname.replace(localePrefixPattern, '') || '/'
      const normalizedPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`
      
      // Navigate to the new locale
      if (newLocale === 'zh-CN') {
        // Default locale, no prefix
        router.push(normalizedPath)
      } else {
        // Other locales need prefix
        router.push(`/${newLocale}${normalizedPath}`)
      }
      router.refresh()
    })
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 whitespace-nowrap">
        <Globe className="w-4 h-4" />
        <span className="whitespace-nowrap">{locales.find(l => l.code === currentLocale)?.flag} {locales.find(l => l.code === currentLocale)?.name}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => handleLanguageChange(locale.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                currentLocale === locale.code
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700'
              }`}
              disabled={isPending}
            >
              <span className="flex items-center space-x-2">
                <span>{locale.flag}</span>
                <span>{locale.name}</span>
                {currentLocale === locale.code && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
