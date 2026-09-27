import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DocumentLayout from '../components/DocumentLayout'
import Layout from '../components/LayoutIntl'
import { locales } from '@/config/i18n'
import '../globals.css'

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onlymath.org'), applicationName: 'OnlyMath', icons: { icon: '/logo.svg' }, manifest: '/site.webmanifest', robots: { index: true, follow: true } }
export function generateStaticParams() { return locales.map(item => ({ locale: item.code })) }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.some(item => item.code === locale)) notFound()
  return <DocumentLayout locale={locale}><Layout locale={locale}>{children}</Layout></DocumentLayout>
}
