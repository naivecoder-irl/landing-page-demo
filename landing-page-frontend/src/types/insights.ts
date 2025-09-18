/**
 * Data-models for "Insights".
 *
 * There are two layers of types:
 * 1) Strapi* types mirror the raw Strapi API payloads. 
 *    They are intentionally "open" (by extending Record<string, unknown>) 
 *    so that unexpected keys added by plugins or custom fields 
 *    do not break type checking. Using `unknown` preserves type safety.
 * 
 * 2) Insight* types are normalized, UI-friendly view models that the components render.
 *    They contain only the fields the UI needs, with clearer nullability and naming.
 */

/**
 * A single image rendition (e.g., thumbnail, small, medium) produced by Strapi.
 * Extends `Record<string, unknown>` to tolerate extra keys that may appear.
 */
export interface StrapiImageVariant extends Record<string, unknown> {
  url: string;
  width?: number;
  height?: number;
}

/**
 * A Strapi media asset (usually from the Upload plugin).
 * Extends `Record<string, unknown>` so additional metadata from plugins
 * (e.g., EXIF, custom fields) does not cause type errors.
 */
export interface StrapiMediaAsset extends Record<string, unknown> {
  url: string;
  width?: number;
  height?: number;
  /** Alternative text for accessibility; can be null in Strapi. */
  alternativeText?: string | null;
  /**
   * Dictionary of responsive variants keyed by arbitrary names
   * (e.g., "thumbnail", "small", "medium", or custom keys).
   */
  formats?: Record<string, StrapiImageVariant>;
}

/** Media field as it appears in Strapi relations; can be null when not set. */
export type StrapiMedia = StrapiMediaAsset | null;

/**
 * Raw article shape as returned by Strapi.
 * Extends `Record<string, unknown>` because Strapi responses are extensible
 * and may include plugin-specific or environment-specific fields.
 */
export interface StrapiArticle extends Record<string, unknown> {
  id: number;
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  /** Custom publish date; may be null for drafts or scheduled content. */
  publishedDate?: string | null;
  /** Optional cover image relation. */
  cover?: StrapiMedia;
  /**
   * Optional category relation. The object is open to allow extra fields
   * (e.g., SEO flags) without breaking the type.
   */
  category?: ({ name?: string | null } & Record<string, unknown>) | null;
  author?:
  | ({
    name?: string | null;
    avatar?: StrapiMedia;
  } & Record<string, unknown>)
  | null;
}

/** Paginated Strapi response for articles (simplified to the data array). */
export interface StrapiArticlesResponse {
  /** Array of raw article entities; may be absent if request failed. */
  data?: StrapiArticle[];
}

/**
 * Normalized image shape used by the UI.
 * All properties are explicit and required.
 */
export interface InsightImage {
  /** Public URL used by <img> or next/image. */
  url: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * UI-facing preview model for an article card.
 * This is the stable shape consumed by components.
 */
export interface InsightPreview {
  id: number;
  /** Strapi document identifier */
  documentId: string;
  slug: string;
  title: string;
  description: string;
  categoryName: string;
  publishedAt: {
    label: string;
    iso?: string;
  };
  coverImage: InsightImage | null;
  /** Author block for the card footer. */
  author: {
    name: string;
    avatarImage: InsightImage | null;
  };
}
