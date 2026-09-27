import ContactView from '@/app/components/ContactView'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const zh = locale === 'zh-CN'
  return buildPageMetadata({ title: zh ? '联系 OnlyMath' : 'Contact OnlyMath', description: zh ? '反馈错误、推荐资源或联系 OnlyMath。' : 'Send corrections, resource suggestions, or partnership notes to OnlyMath.', locale, path: '/contact' })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <ContactView locale={locale} />
}
