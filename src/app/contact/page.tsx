import ContactForm from '@/app/components/ContactForm'
import Layout from '@/app/components/LayoutIntl'
import { defaultLocale } from '@/config/i18n'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: '联系 OnlyMath',
  description: '向 OnlyMath 反馈数学资源错误、推荐学习资料或发送合作建议。',
  path: '/contact'
})

export default function ContactPage() {
  return (
    <Layout locale={defaultLocale}>
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">联系 OnlyMath</h1>
          <p className="mb-8 text-lg text-gray-600">
            欢迎反馈内容错误、推荐高质量数学资源，或提出网站体验建议。
          </p>
          <ContactForm />
        </div>
      </div>
    </Layout>
  )
}
