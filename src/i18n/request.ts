import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '@/config/i18n';

export default getRequestConfig(async ({locale}) => {
  // Handle undefined locale by using default locale
  if (!locale || !locales.some((l) => l.code === locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});