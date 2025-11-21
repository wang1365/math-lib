import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import { locales, defaultLocale } from '@/config/i18n';
import './globals.css';
import { Metadata } from 'next';
import Analytics from './components/Analytics';
 

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }));
}

export const metadata: Metadata = {
  title: {
    default: '数学资源库 - 探索数学的无限可能',
    template: '%s | 数学资源库'
  },
  description: '汇集全球优质数学学习资源，为数学爱好者、学生和研究者提供全面的数学知识体系和学习工具。从基础数学到高等数学，从理论到应用。',
  keywords: ['数学', '数学学习', '数学资源', '在线数学', '数学教育', '数学工具', '数学课程', '数学视频', '数学百科'],
  authors: [{ name: '数学资源库团队' }],
  creator: '数学资源库',
  publisher: '数学资源库',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.onlymath.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '数学资源库 - 探索数学的无限可能',
    description: '汇集全球优质数学学习资源，为数学爱好者、学生和研究者提供全面的数学知识体系和学习工具。',
    url: 'https://www.onlymath.org',
    siteName: '数学资源库',
    images: [
      {
        url: 'https://www.onlymath.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '数学资源库',
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '数学资源库 - 探索数学的无限可能',
    description: '汇集全球优质数学学习资源，为数学爱好者、学生和研究者提供全面的数学知识体系和学习工具。',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale: paramsLocale } = await params;
  let locale = paramsLocale || defaultLocale;
  const messages = await getMessages();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
  // Ensure the locale is valid
  if (!locales.some(l => l.code === locale)) {
    // Redirect to default locale if invalid
    locale = defaultLocale;
  }


  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/globe.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9789961264819993"
                crossOrigin="anonymous"></script>
        {/* <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9789961264819993"
          strategy="afterInteractive"
          async
          crossOrigin="anonymous"
        /> */}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-C1QDG4M016`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C1QDG4M016');
          `}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=G-C1QDG4M016`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', 'G-C1QDG4M016');
              `}
            </Script>
          </>
        )}
        {GA_ID && <Analytics gaId='G-C1QDG4M016' />}
      </body>
    </html>
  );
}
