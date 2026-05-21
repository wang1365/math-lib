import { buildRouteMetadata } from '@/lib/routeMetadata'

export const generateMetadata = () => buildRouteMetadata('tools')

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}

