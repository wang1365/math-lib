import GuidesPage from '@/app/components/GuidesPage'
import Layout from '@/app/components/LayoutIntl'
import { defaultLocale } from '@/config/i18n'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: '数学学习指南',
  description: 'OnlyMath 原创数学学习路线、资源选择方法和核心概念说明。',
  path: '/guides',
  keywords: ['数学学习指南', '微积分自学', '线性代数学习路线', 'math learning guide']
})

export default function GuidesRoutePage() {
  return (
    <Layout locale={defaultLocale}>
      <GuidesPage locale={defaultLocale} />
    </Layout>
  )
}
