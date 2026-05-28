import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  serverExternalPackages: ['sharp', 'drizzle-kit'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('drizzle-kit');
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'precisionsigns.com.au',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'dlpwfd6kwolf1.cloudfront.net',
      },
    ],
  },
  async redirects() {
    return [
      // Old gaming subdomain pages
      {
        source: '/monolith',
        destination: '/products/monolith-infill',
        permanent: true,
      },
      {
        source: '/monolith/',
        destination: '/products/monolith-infill',
        permanent: true,
      },
      {
        source: '/our-range/the-halo-range',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/our-range/the-halo-range/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/our-range/led-infills',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/our-range/led-infills/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/our-range/bulkhead-ceiling-signage',
        destination: '/products/bulkhead',
        permanent: true,
      },
      {
        source: '/our-range/bulkhead-ceiling-signage/',
        destination: '/products/bulkhead',
        permanent: true,
      },
      {
        source: '/end-of-bank-signage',
        destination: '/products/premium-bankend',
        permanent: true,
      },
      {
        source: '/end-of-bank-signage/',
        destination: '/products/premium-bankend',
        permanent: true,
      },
      {
        source: '/infill-signage',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/infill-signage/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/precision-graphics',
        destination: '/content',
        permanent: true,
      },
      {
        source: '/precision-graphics/',
        destination: '/content',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-studies/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/shop/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/gamerise',
        destination: '/',
        permanent: true,
      },
      {
        source: '/gamerise/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pixel-info',
        destination: '/content/precision-pixel',
        permanent: true,
      },
      {
        source: '/pixel-info/',
        destination: '/content/precision-pixel',
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
