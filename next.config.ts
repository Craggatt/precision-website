import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [
    '@aws-sdk/client-s3',
    '@aws-sdk/lib-storage',
    '@aws-sdk/s3-request-presigner',
    '@aws-sdk/xml-builder',
    '@nodable/entities',
    'sharp',
    'drizzle-kit',
    'drizzle-orm',
    '@payloadcms/db-postgres',
    '@payloadcms/drizzle',
  ],
  experimental: {
    serverComponentsExternalPackages: [
      '@aws-sdk/client-s3',
      '@aws-sdk/lib-storage',
      '@aws-sdk/s3-request-presigner',
      '@aws-sdk/xml-builder',
      '@nodable/entities',
      'sharp',
      'drizzle-kit',
      'drizzle-orm',
      '@payloadcms/db-postgres',
      '@payloadcms/drizzle',
    ],
  },
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
        protocol: "https",
        hostname: "precisionsigns.com.au",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "dlpwfd6kwolf1.cloudfront.net",
      },
    ],
  },
};

export default withPayload(nextConfig);
