import { buildRouteMetadata } from '@/lib/routeMetadata'

export const generateMetadata = () => buildRouteMetadata('branches')

export default function BranchesLayout({ children }: { children: React.ReactNode }) {
  return children
}

