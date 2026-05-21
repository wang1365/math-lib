import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, getLocale } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';
import { locales, defaultLocale } from '@/config/i18n';
import './globals.css';
import { Metadata } from 'next';
import { absoluteUrl, ogLocaleMap, siteName, siteUrl } from '@/lib/seo';
 

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common')
  const currentLocale = await getLocale()
  const siteTitle = t('siteTitle')
  const siteDescription = t('siteDescription')
  const ogLocale = ogLocaleMap[currentLocale as keyof typeof ogLocaleMap] || ogLocaleMap[defaultLocale]

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    },
    description: siteDescription,
    keywords: [
      'mathematics',
      'math resources',
      'math learning',
      'online math tools',
      'math education',
      'calculus',
      'algebra',
      'geometry',
      'statistics',
      '数学',
      '数学学习',
      '数学资源',
      '在线数学工具'
    ],
    authors: [{ name: 'Xiaochuan Wang' }],
    creator: siteTitle,
    publisher: siteTitle,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl,
      siteName: siteTitle,
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
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
      images: [absoluteUrl('/opengraph-image')],
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

        <script
          id="schema-org-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              alternateName: ['Only Math', 'Math Resources Repository', '数学资源库'],
              url: siteUrl,
              inLanguage: locales.map(locale => locale.code),
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/resources?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        <script
          id="schema-org-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteName,
              url: siteUrl,
              logo: absoluteUrl('/logo.svg')
            })
          }}
        />
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
