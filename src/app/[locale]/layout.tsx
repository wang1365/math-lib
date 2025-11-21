import { locales } from '@/config/i18n';
import Layout from '../components/LayoutIntl';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

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

  const baseMessages = (await import('@/messages/zh-CN.json')).default as any;
  const localeMessages = (await import(`@/messages/${locale}.json`)).default as any;

  const deepMerge = (base: any, override: any): any => {
    if (typeof base !== 'object' || base === null) return override ?? base;
    const result: any = Array.isArray(base) ? [...base] : { ...base };
    for (const key of Object.keys(override || {})) {
      const bv = base[key];
      const ov = override[key];
      result[key] = (bv && typeof bv === 'object' && !Array.isArray(bv))
        ? deepMerge(bv, ov)
        : ov;
    }
    return result;
  };

  const messages = deepMerge(baseMessages, localeMessages);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Layout locale={locale}>
        {children}
      </Layout>
    </NextIntlClientProvider>
  );
}
