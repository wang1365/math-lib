// 国际化配置
export const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇭🇰', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' }
] as const

export type Locale = typeof locales[number]['code']
export const defaultLocale: Locale = 'zh-CN'

// 默认语言设置
export const localeNames = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'fr': 'Français',
  'ja': '日本語',
  'es': 'Español',
  'pt': 'Português',
  'ko': '한국어',
  'ar': 'العربية',
  'de': 'Deutsch'
} as const