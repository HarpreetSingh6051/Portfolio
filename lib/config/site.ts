/**
 * SITE CONFIGURATION
 *
 * Set NEXT_PUBLIC_SITE_URL in your Vercel project (or replace the fallback
 * below) so canonical URLs, the sitemap, and robots.txt point at your domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://harpreet-singh-portfolio.vercel.app";
