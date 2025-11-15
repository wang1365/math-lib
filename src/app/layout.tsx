import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import { locales, defaultLocale } from '@/config/i18n';
import './globals.css';
 

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }));
}

export const metadata = {
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
  metadataBase: new URL('https://math-resources-site.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '数学资源库 - 探索数学的无限可能',
    description: '汇集全球优质数学学习资源，为数学爱好者、学生和研究者提供全面的数学知识体系和学习工具。',
    url: 'https://math-resources-site.vercel.app',
    siteName: '数学资源库',
    images: [
      {
        url: 'https://math-resources-site.vercel.app/og-image.jpg',
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
    images: ['https://math-resources-site.vercel.app/twitter-image.jpg'],
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
  // Ensure the locale is valid
  if (!locales.some(l => l.code === locale)) {
    // Redirect to default locale if invalid
    locale = defaultLocale;
  }


  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="afterInteractive"
          async
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
