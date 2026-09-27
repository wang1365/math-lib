import CalculatorView from '@/app/components/CalculatorView'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata('en', 'calculator')
export default function Page() { return <CalculatorView /> }
