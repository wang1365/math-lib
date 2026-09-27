// 国际化配置
export const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', dir: 'ltr' },
] as const

export type Locale = typeof locales[number]['code']
export const defaultLocale: Locale = 'en'

// 默认语言设置
export const localeNames = {
  'en': 'English',
  'zh-CN': '简体中文'
} as const
