import ExamplesView from '../../components/ExamplesView'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata(locale, 'examples') }
export default function Page() { return <ExamplesView /> }
