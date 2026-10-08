import { defaultLocale } from '@/config/i18n'
import { pageMetadata, type Section } from '@/lib/metadata'

// Legacy layout callers share the same metadata as their redesigned pages.
export async function buildRouteMetadata(page: Section, locale: string = defaultLocale) {
  return pageMetadata(locale, page)
}
