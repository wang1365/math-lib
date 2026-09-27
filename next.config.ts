import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    const retired = ['fr', 'ja', 'es', 'pt', 'ko', 'ar', 'de']
    return [
      ...retired.flatMap(locale => [
        { source: `/${locale}`, destination: '/', permanent: true },
        { source: `/${locale}/:path*`, destination: '/:path*', permanent: true },
      ]),
      { source: '/zh-TW', destination: '/zh-CN', permanent: true },
      { source: '/zh-TW/:path*', destination: '/zh-CN/:path*', permanent: true },
      { source: '/branches/:slug', destination: '/branches', permanent: true },
      { source: '/zh-CN/branches/:slug', destination: '/zh-CN/branches', permanent: true },
    ]
  },
};

export default withNextIntl(nextConfig);
