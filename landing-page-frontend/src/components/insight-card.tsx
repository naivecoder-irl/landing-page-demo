import qs from "qs";
import DesktopInsightCard from "./desktop-insight-card";
import MobileInsightCard from "./mobile-insight-card";

const STRAPI_URL: string =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

type StrapiImageFormat = {
  url: string;
  width?: number;
  height?: number;
} & Record<string, unknown>;

type StrapiMedia =
  | ({
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string | null;
      formats?: Record<string, StrapiImageFormat>;
    } & Record<string, unknown>)
  | null;

type StrapiArticleEntity = {
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

type StrapiArticleResponse = {
  data?: StrapiArticleEntity[];
};

type ImageResource = {
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

function resolveMedia(
  media: StrapiMedia | undefined,
  preferredFormats: string[] = ["large", "medium", "small", "thumbnail"],
): ImageResource | null {
  if (!media?.url) {
    return null;
  }

  const formats = media.formats ?? {};
  const formatKey = preferredFormats.find((key) => formats[key]);
  const format = formatKey ? formats[formatKey] : undefined;
  const url = format?.url ?? media.url;
  const width = format?.width ?? media.width ?? 800;
  const height = format?.height ?? media.height ?? 600;
  const alt =
    typeof media.alternativeText === "string" ? media.alternativeText : "";

  return {
    url: url.startsWith("http") ? url : `${STRAPI_URL}${url}`,
    width,
    height,
    alt,
  };
}

function formatPublishedDate(date: string | null | undefined) {
  if (!date) {
    return { label: "Date TBA" };
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) {
    return { label: date };
  }

  return {
    label: parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    iso: parsed.toISOString(),
  };
}

async function getInsights(): Promise<InsightArticle[]> {
  const query = qs.stringify(
    {
      fields: ["title", "slug", "description", "publishedDate", "documentId"],
      sort: ["publishedDate:desc"],
      populate: {
        cover: {
          fields: ["url", "alternativeText", "formats", "width", "height"],
        },
        category: {
          fields: ["name"],
        },
        author: {
          fields: ["name"],
          populate: {
            avatar: {
              fields: ["url", "alternativeText", "formats", "width", "height"],
            },
          },
        },
      },
      pagination: {
        pageSize: 6,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const res = await fetch(`${STRAPI_URL}/api/articles?${query}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return [];
  }

  const json = (await res.json()) as StrapiArticleResponse;

  // TODO delete after debugging
  console.log(json);

  return (json.data ?? []).map((item) => {
    const cover = resolveMedia(item.cover);
    const author = item.author ?? null;
    const avatar = resolveMedia(author?.avatar, [
      "thumbnail",
      "small",
      "medium",
    ]);
    const published = formatPublishedDate(item.publishedDate ?? null);

    return {
      id: item.id,
      documentId: item.documentId ?? item.slug ?? `${item.id}`,
      slug: item.slug ?? `${item.id}`,
      title: item.title ?? "Title Not Found",
      description: item.description ?? "",
      categoryName: item.category?.name ?? "Press Release",
      published, // record published date string
      cover,
      author: {
        name: author?.name ?? "Sam Plane",
        avatar,
      },
    };
  });
}

export default async function InsightCard() {
  const articles = await getInsights();

  if (!articles.length) {
    return (
      <section id="insights" className="px-4 py-24">
        <div className="mx-auto max-w-5xl text-center text-muted-foreground">
          <p>No insights available right now. Check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="insights" className="px-4 py-24">
      <div className="mx-auto max-w-7xl min-w-[360px]">
        <div className="mb-10">
          <h2 className="hidden text-3xl tracking-tight md:block md:text-4xl">
            More Insights
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="w-full">
              <DesktopInsightCard article={article} />
              <MobileInsightCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
