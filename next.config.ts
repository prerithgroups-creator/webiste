import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder images for mock project data (see data/projects.ts).
      // Used as a fallback by components/ik-image.tsx while
      // NEXT_PUBLIC_IMAGEKIT_URL isn't set yet.
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Default ImageKit delivery domain. If your ImageKit URL endpoint
      // uses a custom domain instead of *.imagekit.io, add it here too.
      {
        protocol: "https",
        hostname: "*.imagekit.io",
      },
      // Sanity's image CDN — used directly by components/ik-image.tsx's
      // next/image fallback whenever NEXT_PUBLIC_IMAGEKIT_URL isn't set,
      // since project images uploaded in Sanity Studio are served from here.
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
