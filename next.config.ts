import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // LAN IPs for opening the dev server from phones/tablets (update if DHCP changes)
  allowedDevOrigins: ["10.0.0.3", "10.0.0.20"],
};

export default withNextIntl(nextConfig);
