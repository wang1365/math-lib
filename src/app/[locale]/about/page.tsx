import TrustPage from '@/app/components/TrustPage'
import { buildPageMetadata } from '@/lib/seo'
import { getTrustContent } from '@/lib/trustContent'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = getTrustContent(locale, 'about')
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/about'
  })
}

export default async function LocalizedAboutPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <TrustPage locale={locale} page="about" />
}
