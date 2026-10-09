import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  TITLE_BRAND,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
  IS_INDEXABLE_DEPLOYMENT,
  absoluteUrl,
} from "./site";

interface PageMetaOptions {
  /** Page title without the brand suffix. Home ("" path) uses it verbatim. */
  title: string;
  /** Aim for <= 160 characters so Google does not truncate it. */
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function pageTitle(title: string, path = ""): string {
  return path === "" ? title : `${title} | ${TITLE_BRAND}`;
}

export function createMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE.url,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(path || "/");
  const fullTitle = pageTitle(title, path);
  const indexable = IS_INDEXABLE_DEPLOYMENT && !noIndex;

  return {
    // `absolute` stops the root layout's title.template from appending the brand a second time.
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(SITE_URL),
    // A noindex page should not declare a canonical (it used to point /get-started at /dashboard).
    alternates: indexable ? { canonical: url } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        ogImage === DEFAULT_OG_IMAGE.url
          ? DEFAULT_OG_IMAGE
          : { url: ogImage, width: 1200, height: 630, alt: title },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: indexable
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: true },
  };
}

export { SITE_URL, SITE_NAME };
