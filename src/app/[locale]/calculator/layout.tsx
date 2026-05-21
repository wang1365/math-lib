import { buildRouteMetadata } from '@/lib/routeMetadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return buildRouteMetadata('calculator', locale)
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}

