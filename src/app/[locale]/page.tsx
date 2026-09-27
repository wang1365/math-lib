import HomeView from '../components/HomeView'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata(locale, 'home') }
export default function Page() { return <HomeView /> }
