import TrustPage from '@/app/components/TrustPage'
import { buildPageMetadata } from '@/lib/seo'
import { getTrustContent } from '@/lib/trustContent'

const content = getTrustContent('en', 'privacy')
export const metadata = buildPageMetadata({ title: content.title, description: content.description, path: '/privacy' })
export default function Page() { return <TrustPage locale="en" page="privacy" /> }
