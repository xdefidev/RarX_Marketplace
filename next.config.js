/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 1500000,
  },
  env: {
    PRIVATE_KEY:
      "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
  },
};

module.exports = nextConfig;
