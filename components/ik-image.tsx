import { Image as ImageKitImage } from "@imagekit/next";
import NextImage, { type ImageProps } from "next/image";

/**
 * Base URL endpoint for your ImageKit account, e.g.
 * "https://ik.imagekit.io/your_imagekit_id".
 *
 * Get this from the ImageKit dashboard: https://imagekit.io/dashboard
 * -> "URL-endpoint" panel on the overview page (or Developer Options ->
 * URL endpoints). Copy it into `.env.local` as NEXT_PUBLIC_IMAGEKIT_URL
 * (see .env.example).
 */
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL;

type IKImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Site-wide image component for content images (project covers, galleries,
 * before/after, lightbox). Wraps ImageKit's `Image` component to get
 * automatic responsive `srcset` generation, lazy loading, and
 * `quality=auto` + `format=auto` delivery (WebP/AVIF where supported) for
 * free, on top of everything `next/image` already provides.
 *
 * Fallback: if `NEXT_PUBLIC_IMAGEKIT_URL` isn't configured yet, this
 * renders a plain `next/image` instead, so the site keeps previewing
 * correctly with the mock picsum.photos placeholder URLs used in
 * data/projects.ts. No code changes are needed once the env var is set —
 * ImageKit delivery just turns on.
 */
export function IKImage({ alt, sizes, ...props }: IKImageProps) {
  const resolvedSizes = sizes ?? (props.fill ? "100vw" : undefined);

  if (!IMAGEKIT_URL_ENDPOINT) {
    return <NextImage alt={alt} sizes={resolvedSizes} {...props} />;
  }

  return (
    <ImageKitImage
      urlEndpoint={IMAGEKIT_URL_ENDPOINT}
      alt={alt}
      sizes={resolvedSizes}
      // `format: "auto"` lets ImageKit negotiate WebP/AVIF based on the
      // browser's Accept header. ImageKit's `quality` param only accepts a
      // fixed number (there's no "auto" literal) — 80 is ImageKit's own
      // recommended default for perceptually-lossless compression; enable
      // "Automatic quality" in the ImageKit dashboard for true per-image
      // auto quality tuning.
      transformation={[{ format: "auto", quality: 80 }]}
      {...props}
    />
  );
}
