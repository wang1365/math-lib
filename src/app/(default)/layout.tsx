import type { Metadata } from 'next'
import DocumentLayout from '../components/DocumentLayout'
import Layout from '../components/LayoutIntl'
import '../globals.css'

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onlymath.org'), applicationName: 'OnlyMath', icons: { icon: '/logo.svg' }, manifest: '/site.webmanifest', robots: { index: true, follow: true } }

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="en"><Layout locale="en">{children}</Layout></DocumentLayout>
}
