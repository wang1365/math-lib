import Layout from '@/app/components/LayoutIntl'
import TrustPage from '@/app/components/TrustPage'
import { defaultLocale } from '@/config/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getTrustContent } from '@/lib/trustContent'

const content = getTrustContent(defaultLocale, 'about')

export const metadata = buildPageMetadata({
  title: content.title,
  description: content.description,
  path: '/about'
})

export default function AboutPage() {
  return (
    <Layout locale={defaultLocale}>
      <TrustPage locale={defaultLocale} page="about" />
    </Layout>
  )
}
