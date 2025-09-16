export interface StrapiImageVariant extends Record<string, unknown> {
  url: string;
  width?: number;
  height?: number;
}

export interface StrapiMediaAsset extends Record<string, unknown> {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string | null;
  formats?: Record<string, StrapiImageVariant>;
}

export type StrapiMedia = StrapiMediaAsset | null;

export interface StrapiArticle extends Record<string, unknown> {
  id: number;
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  publishedDate?: string | null;
  cover?: StrapiMedia;
  category?: ({ name?: string | null } & Record<string, unknown>) | null;
  author?:
    | ({
        name?: string | null;
        avatar?: StrapiMedia;
      } & Record<string, unknown>)
    | null;
}

export interface StrapiArticlesResponse {
  data?: StrapiArticle[];
}

export interface InsightImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface InsightPreview {
  id: number;
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
  author: {
    name: string;
    avatarImage: InsightImage | null;
  };
}
