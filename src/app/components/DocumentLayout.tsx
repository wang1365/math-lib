import { NextIntlClientProvider } from 'next-intl'
import Script from 'next/script'

export default async function DocumentLayout({ locale, children }: { locale: string; children: React.ReactNode }) {
  const messages = (await import(`@/messages/${locale}.json`)).default
  const gaId = process.env.GA_ID || process.env.NEXT_PUBLIC_GA_ID
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  return <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}><body>
    <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>
    {gaId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}</Script></>}
    {adsenseId && <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} strategy="afterInteractive" crossOrigin="anonymous" />}
  </body></html>
}
