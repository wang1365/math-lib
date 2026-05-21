import { buildRouteMetadata } from '@/lib/routeMetadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return buildRouteMetadata('tools', locale)
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}

