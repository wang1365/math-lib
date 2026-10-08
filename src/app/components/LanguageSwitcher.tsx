'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe2 } from 'lucide-react'
import { locales, type Locale } from '@/config/i18n'
import { localeSwitchPath, siteCopy } from '@/lib/site-copy'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const c = siteCopy(locale)
  const currentPath = pathname.replace(/^\/(en|zh-CN|zh-TW|fr|ja|es|pt|ko|ar|de)(?=\/|$)/, '') || '/'

  return <label className="language-select"><Globe2 size={17} aria-hidden="true" /><span className="sr-only">{c.language}</span>
    <select aria-label={c.language} value={locale} onChange={event => router.push(`${localeSwitchPath(event.target.value as Locale, currentPath)}${window.location.search}${window.location.hash}`)}>
      {locales.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}
    </select>
  </label>
}
