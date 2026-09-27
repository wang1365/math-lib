import GuidesPage from '@/app/components/GuidesPage'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({ title: 'Math Learning Guides', description: 'Practical guides to math study paths, resource selection, and core concepts.', path: '/guides', keywords: ['math learning guide', 'calculus study plan', 'linear algebra study path'] })
export default function Page() { return <GuidesPage locale="en" /> }
