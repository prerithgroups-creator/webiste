import type { SVGProps } from "react";

/**
 * lucide-react no longer ships brand/social icons, so these are small
 * hand-rolled SVG glyphs used for the footer's social links. Swap or extend
 * this file if more social platforms are added later.
 */

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.25c0-.87.25-1.46 1.5-1.46h1.6V3.36C16.3 3.25 15.36 3 14.27 3 11.98 3 10.5 4.4 10.5 7v2.5H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.97 1.97 0 1 0 5.25 7.44 1.97 1.97 0 0 0 5.25 3.5ZM20.44 20.5H17.06V14.28c0-1.48-.53-2.49-1.86-2.49-1.02 0-1.62.68-1.89 1.34-.1.24-.12.57-.12.9V20.5H9.81s.05-11.15 0-12.3H13.19v1.74c.45-.7 1.25-1.7 3.03-1.7 2.21 0 3.87 1.44 3.87 4.55V20.5Z" />
    </svg>
  );
}
