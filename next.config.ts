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
      },{
        protocol: 'https',
        hostname: 'youtube.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com;",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/jackpot/:path*',
        destination: 'https://dev.precisionsigns.com.au/:path*',
      },
    ];
  },
  async redirects() {
    return [
      // Jackpot subdomain redirect
      // {
      //   source: '/jackpot/:path*',
      //   destination: 'https://dev.precisionsigns.com.au/:path*',
      //   permanent: false,
      // },
      // Case studies
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
        source: '/casestudies/the-farmers-home-hotel',
        destination: '/',
        permanent: true,
      },
      {
        source: '/casestudies/the-farmers-home-hotel/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/casestudies/hellenic-club-aquarium',
        destination: '/',
        permanent: true,
      },
      {
        source: '/casestudies/hellenic-club-aquarium/',
        destination: '/',
        permanent: true,
      },
      // Service/Support
      {
        source: '/precision-service-support-requests',
        destination: '/service-support',
        permanent: true,
      },
      {
        source: '/precision-service-support-requests/',
        destination: '/service-support',
        permanent: true,
      },
      // Blog
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/testimonials',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/testimonials/',
        destination: '/',
        permanent: true,
      },
      // Content pages
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
      {
        source: '/jackpot-scoreboard-v3',
        destination: '/content/jackpot-scoreboard',
        permanent: true,
      },
      {
        source: '/jackpot-scoreboard-v3/',
        destination: '/content/jackpot-scoreboard',
        permanent: true,
      },
      // Product pages - Halo range
      {
        source: '/halo-maxi-single-sided',
        destination: '/products/maxi-halo-single-sided',
        permanent: true,
      },
      {
        source: '/halo-maxi-single-sided/',
        destination: '/products/maxi-halo-single-sided',
        permanent: true,
      },
      {
        source: '/halo-mini-double-sided',
        destination: '/products/mini-halo-double-sided',
        permanent: true,
      },
      {
        source: '/halo-mini-double-sided/',
        destination: '/products/mini-halo-double-sided',
        permanent: true,
      },
      // Product pages - Other products
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
        source: '/large-screen',
        destination: '/products/sports-screen',
        permanent: true,
      },
      {
        source: '/large-screen/',
        destination: '/products/sports-screen',
        permanent: true,
      },
      {
        source: '/bank-ends',
        destination: '/products/premium-bankend',
        permanent: true,
      },
      {
        source: '/bank-ends/',
        destination: '/products/premium-bankend',
        permanent: true,
      },
      {
        source: '/gong-1200',
        destination: '/products/1200-gong',
        permanent: true,
      },
      {
        source: '/gong-1200/',
        destination: '/products/1200-gong',
        permanent: true,
      },
      {
        source: '/lcd',
        destination: '/products/neoglass-lcd',
        permanent: true,
      },
      {
        source: '/lcd/',
        destination: '/products/neoglass-lcd',
        permanent: true,
      },
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
        source: '/neoglass-55',
        destination: '/products/neoglass-lcd',
        permanent: true,
      },
      {
        source: '/neoglass-55/',
        destination: '/products/neoglass-lcd',
        permanent: true,
      },
      {
        source: '/monolith-mini',
        destination: '/products/monolith-mini-infill',
        permanent: true,
      },
      {
        source: '/monolith-mini/',
        destination: '/products/monolith-mini-infill',
        permanent: true,
      },
      // Old gaming subdomain pages
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
        source: '/shop',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/shop/',
        destination: '/products',
        permanent: true,
      },
      // PDF redirects - redirect to homepage
      {
        source: '/wp-content/uploads/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
