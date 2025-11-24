import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, getLocale } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';
import { locales, defaultLocale } from '@/config/i18n';
import './globals.css';
import { Metadata } from 'next';
import Analytics from './components/Analytics';
 

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }));
}

const ogLocaleMap: Record<string, string> = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'en': 'en_US',
  'fr': 'fr_FR',
  'ja': 'ja_JP',
  'es': 'es_ES',
  'pt': 'pt_PT',
  'ko': 'ko_KR',
  'ar': 'ar_SA',
  'de': 'de_DE'
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common')
  const currentLocale = await getLocale()
  const siteTitle = t('siteTitle')
  console.log('====>', currentLocale, siteTitle)
  const siteDescription = t('siteDescription')
  const defaultLocaleCode = defaultLocale
  const languages = Object.fromEntries(
    locales.map(l => [l.code, l.code === defaultLocaleCode ? '/' : `/${l.code}`])
  )
  const ogLocale = ogLocaleMap[currentLocale] || ogLocaleMap[defaultLocaleCode] || 'zh_CN'

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    },
    description: siteDescription,
    keywords: ['数学', '数学学习', '数学资源', '在线数学', '数学教育', '数学工具', '数学课程', 'Math', 'Math Resource'],
    authors: [{ name: 'Xiaochuan Wang' }],
    creator: siteTitle,
    publisher: siteTitle,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.onlymath.org'),
    alternates: {
      canonical: '/',
      languages
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: 'https://www.onlymath.org',
      siteName: siteTitle,
      images: [
        {
          url: 'https://www.onlymath.org/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteTitle,
        }
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: ['https://www.onlymath.org/twitter-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'NurRRpvl5lSXtyTwRWaWCm6i_s4Nyg9L0BJ_bzxNkE4',
      yandex: 'your-yandex-verification-code',
    },
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale: paramsLocale } = await params
  let locale = paramsLocale || await getLocale();
  const messages = await getMessages();
  // Ensure the locale is valid
  if (!locales.some(l => l.code === locale)) {
    // Redirect to default locale if invalid
    locale = defaultLocale;
  }


  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9789961264819993"
          strategy="afterInteractive"
          async
          crossOrigin="anonymous"
        />

        <Script id="schema-org-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "数学资源库",
            url: "https://www.onlymath.org"
          })}
        </Script>
        <Script id="schema-org-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "数学资源库",
            url: "https://www.onlymath.org",
            logo: "https://www.onlymath.org/logo.svg"
          })}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9789961264819993"
          data-ad-slot="4182268685"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <Script id="adsbygoogle-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
        <GoogleAnalytics gaId='G-C1QDG4M016' />
      </body>
    </html>
  );
}
