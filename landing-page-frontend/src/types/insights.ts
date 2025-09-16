export type StrapiImageFormat = {
  url: string;
  width?: number;
  height?: number;
} & Record<string, unknown>;

export type StrapiMedia =
  | ({
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string | null;
      formats?: Record<string, StrapiImageFormat>;
    } & Record<string, unknown>)
  | null;

export type StrapiArticleEntity = {
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
};

export type StrapiArticleResponse = {
  data?: StrapiArticleEntity[];
};

export type ImageResource = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type InsightArticle = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  categoryName: string;
  published: {
    label: string;
    iso?: string;
  };
  cover: ImageResource | null;
  author: {
    name: string;
    avatar: ImageResource | null;
  };
};
