import CalculatorView from '../../components/CalculatorView'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata(locale, 'calculator') }
export default function Page() { return <CalculatorView /> }
