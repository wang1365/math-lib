import { buildRouteMetadata } from '@/lib/routeMetadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return buildRouteMetadata('examples', locale)
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return children
}

