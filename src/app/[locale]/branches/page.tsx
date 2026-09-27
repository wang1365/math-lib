import TopicsView from '../../components/TopicsView'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata(locale, 'branches') }
export default function Page() { return <TopicsView /> }
