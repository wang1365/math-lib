import TopicsView from '@/app/components/TopicsView'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata('en', 'branches')
export default function Page() { return <TopicsView /> }
