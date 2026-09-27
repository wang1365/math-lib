import ResourcesView from '@/app/components/ResourcesView'
import { pageMetadata } from '@/lib/metadata'
import { parseResourceFilters } from '@/lib/resourceFilters'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return pageMetadata(locale, 'resources')
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const initialFilters = parseResourceFilters(await searchParams)
  return <ResourcesView key={`${initialFilters.q}|${initialFilters.topic}|${initialFilters.format}`} initialFilters={initialFilters} />
}
