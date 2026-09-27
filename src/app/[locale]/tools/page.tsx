import ToolsView from '../../components/ToolsView'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata(locale, 'tools') }
export default function Page() { return <ToolsView /> }
