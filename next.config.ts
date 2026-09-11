import type { NextConfig } from 'next';

const uploadThingAppId = process.env.UPLOADTHING_APPID;

if (!uploadThingAppId) {
  throw new Error('Missing UPLOADTHING_APP_ID');
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: `${uploadThingAppId}.ufs.sh`,
        port: '',
        pathname: '/f/*',
      },
    ],
  },
};

export default nextConfig;
