import TrustPage from '@/app/components/TrustPage'
import { buildPageMetadata } from '@/lib/seo'
import { getTrustContent } from '@/lib/trustContent'

const content = getTrustContent('en', 'terms')
export const metadata = buildPageMetadata({ title: content.title, description: content.description, path: '/terms' })
export default function Page() { return <TrustPage locale="en" page="terms" /> }
