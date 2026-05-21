import { buildRouteMetadata } from '@/lib/routeMetadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return buildRouteMetadata('branches', locale)
}

export default function BranchesLayout({ children }: { children: React.ReactNode }) {
  return children
}

