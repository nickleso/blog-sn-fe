import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "blog-sn-be.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-sn-be.onrender.com",
        port: "",
        pathname: "uploads",
        search: "",
      },
    ],
  },
};

export default nextConfig;
