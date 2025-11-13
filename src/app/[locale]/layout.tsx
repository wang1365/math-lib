import { useTranslations } from 'next-intl';
import { locales } from '@/config/i18n';
import Layout from '../components/LayoutIntl';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <Layout locale={locale}>
      {children}
    </Layout>
  );
}