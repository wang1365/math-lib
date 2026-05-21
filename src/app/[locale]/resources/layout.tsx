import { buildRouteMetadata } from '@/lib/routeMetadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return buildRouteMetadata('resources', locale)
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}

