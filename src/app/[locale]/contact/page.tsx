import ContactForm from '@/app/components/ContactForm'
import { buildPageMetadata } from '@/lib/seo'

const copy = (locale: string) => locale === 'zh-CN' || locale === 'zh-TW'
  ? {
      title: '联系 OnlyMath',
      description: '向 OnlyMath 反馈数学资源错误、推荐学习资料或发送合作建议。',
      intro: '欢迎反馈内容错误、推荐高质量数学资源，或提出网站体验建议。'
    }
  : {
      title: 'Contact OnlyMath',
      description: 'Send corrections, resource suggestions, or partnership notes to OnlyMath.',
      intro: 'Corrections, high-quality math resource suggestions, and site experience feedback are welcome.'
    }

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = copy(locale)
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    locale,
    path: '/contact'
  })
}

export default async function LocalizedContactPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = copy(locale)

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">{content.title}</h1>
        <p className="mb-8 text-lg text-gray-600">{content.intro}</p>
        <ContactForm />
      </div>
    </div>
  )
}
