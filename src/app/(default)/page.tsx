import HomeView from '@/app/components/HomeView'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata('en', 'home')
export default function Page() { return <HomeView /> }
