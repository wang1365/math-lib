import ResourcesView from '@/app/components/ResourcesView'
import { pageMetadata } from '@/lib/metadata'
import { parseResourceFilters } from '@/lib/resourceFilters'

export const metadata = pageMetadata('en', 'resources')

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const initialFilters = parseResourceFilters(await searchParams)
  return <ResourcesView initialFilters={initialFilters} />
}
