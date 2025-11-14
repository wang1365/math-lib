import { locales } from '@/config/i18n';
import Layout from '../components/LayoutIntl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Layout locale={locale}>
        {children}
      </Layout>
    </NextIntlClientProvider>
  );
}
