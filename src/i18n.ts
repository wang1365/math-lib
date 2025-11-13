import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './config/i18n'

const localeMessages = {
  'zh-CN': () => import('./messages/zh-CN.json').then(m => m.default),
  'zh-TW': () => import('./messages/zh-TW.json').then(m => m.default),
  'en': () => import('./messages/en.json').then(m => m.default),
  'fr': () => import('./messages/fr.json').then(m => m.default),
  'ja': () => import('./messages/ja.json').then(m => m.default),
  'es': () => import('./messages/es.json').then(m => m.default),
  'pt': () => import('./messages/pt.json').then(m => m.default),
  'ko': () => import('./messages/ko.json').then(m => m.default),
  'ar': () => import('./messages/ar.json').then(m => m.default),
  'de': () => import('./messages/de.json').then(m => m.default)
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.map(l => l.code).includes(locale as any)) notFound()

  return {
    locale: locale || defaultLocale,
    messages: await localeMessages[locale as keyof typeof localeMessages]()
  }
})