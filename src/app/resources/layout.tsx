import { buildRouteMetadata } from '@/lib/routeMetadata'

export const generateMetadata = () => buildRouteMetadata('resources')

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}

