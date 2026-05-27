import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/lib-storage', '@aws-sdk/s3-request-presigner'],
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
