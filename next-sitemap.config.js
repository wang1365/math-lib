const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onlymath.org'

const locales = [
  'en',
  'zh-CN',
  'zh-TW',
  'fr',
  'ja',
  'es',
  'pt',
  'ko',
  'ar',
  'de'
]

const defaultLocale = 'zh-CN'

const localePattern = /^\/(zh-CN|zh-TW|en|fr|ja|es|pt|ko|ar|de)(?=\/|$)/

const stripLocale = (path) => {
  const p = path.replace(localePattern, '')
  return p || '/'
}

const buildAlternateRefs = (path) => {
  const base = stripLocale(path)
  const refs = locales.map(code => ({
    href: code === defaultLocale ? `${siteUrl}${base}` : `${siteUrl}/${code}${base}`,
    hreflang: code,
    hrefIsAbsolute: true
  }))
  return [...refs, { href: `${siteUrl}${base}`, hreflang: 'x-default', hrefIsAbsolute: true }]
}

module.exports = {
  siteUrl,
  outDir: 'public',
  generateRobotsTxt: false,
  transform: async (_cfg, path) => {
    const base = stripLocale(path)
    const isHome = base === '/'
    const priority = isHome ? 1.0 : 0.8
    return {
      loc: path,
      changefreq: 'weekly',
      priority,
      alternateRefs: buildAlternateRefs(path)
    }
  }
}