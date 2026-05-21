import { locales } from '@/config/i18n';
import Layout from '../components/LayoutIntl';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { buildRouteMetadata } from '@/lib/routeMetadata';

type Messages = Record<string, unknown>;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildRouteMetadata('home', locale);
}

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
  if (!locales.some(l => l.code === locale)) {
    return notFound();
  }
  
  // Enable static rendering
  setRequestLocale(locale);

  const baseMessages = (await import('@/messages/zh-CN.json')).default as Messages;
  const localeMessages = (await import(`@/messages/${locale}.json`)).default as Messages;

  const deepMerge = (base: unknown, override: unknown): unknown => {
    if (typeof base !== 'object' || base === null) return override ?? base;
    const baseRecord = base as Messages;
    const overrideRecord = (override && typeof override === 'object' ? override : {}) as Messages;
    const result: Messages = Array.isArray(base) ? { ...baseRecord } : { ...baseRecord };
    for (const key of Object.keys(overrideRecord)) {
      const bv = baseRecord[key];
      const ov = overrideRecord[key];
      result[key] = (bv && typeof bv === 'object' && !Array.isArray(bv))
        ? deepMerge(bv, ov)
        : ov;
    }
    return result;
  };

  const messages = deepMerge(baseMessages, localeMessages) as Messages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Layout locale={locale}>
        {children}
      </Layout>
    </NextIntlClientProvider>
  );
}
