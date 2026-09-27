import ContactView from '@/app/components/ContactView'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({ title: 'Contact OnlyMath', description: 'Send corrections, resource suggestions, or partnership notes to OnlyMath.', path: '/contact' })
export default function Page() { return <ContactView locale="en" /> }
