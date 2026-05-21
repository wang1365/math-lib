import { buildRouteMetadata } from '@/lib/routeMetadata'

export const generateMetadata = () => buildRouteMetadata('calculator')

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}

