import ResourcesView from '@/app/components/ResourcesView'
import { pageMetadata } from '@/lib/metadata'
import { Suspense } from 'react'

export const metadata = pageMetadata('en', 'resources')
export default function Page() { return <Suspense fallback={<div className="container-wide page-content">Loading resources…</div>}><ResourcesView /></Suspense> }
