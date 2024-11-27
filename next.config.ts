/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["guncelmanset.com.tr"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "guncelmanset.com.tr",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/news/:newsId",
        destination: "/news/:newsId/title",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
