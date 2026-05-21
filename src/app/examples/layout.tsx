import { buildRouteMetadata } from '@/lib/routeMetadata'

export const generateMetadata = () => buildRouteMetadata('examples')

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return children
}

