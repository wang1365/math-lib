import GuidesPage from '@/app/components/GuidesPage'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata('en', 'guides')
export default function Page() { return <GuidesPage locale="en" /> }
