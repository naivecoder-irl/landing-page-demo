import Image from "next/image";
import Link from "next/link";
import qs from "qs";

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

type InsightArticle = {
  id: number;
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

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials.slice(0, 2) || "?";
}

async function getInsights(): Promise<InsightArticle[]> {
  const query = qs.stringify(
    {
      fields: ["title", "slug", "description", "publishedDate"],
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
      slug: item.slug ?? `${item.id}`,
      title: item.title ?? "Title Not Found",
      description: item.description ?? "",
      categoryName: item.category?.name ?? "Press Release",
      published,
      cover,
      author: {
        name: author?.name ?? "Sam Plane",
        avatar,
      },
    };
  });
}

function DesktopInsightCard({ article }: { article: InsightArticle }) {
  return (
    <article className="hidden overflow-hidden rounded-3xl border bg-background shadow-sm transition focus-within:ring-2 focus-within:ring-primary/40 hover:shadow-md md:grid md:grid-rows-2">
      <div className="relative min-h-[220px] border-r bg-muted/40">
        {article.cover ? (
          <Image
            src={article.cover.url}
            alt={article.cover.alt || article.title}
            fill
            sizes="(min-width: 768px) 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            📄
          </div>
        )}
      </div>
      {/* Author Info: avatar | (name over (published + category)) */}
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {/* Author Avatar */}
          {article.author.avatar ? (
            <Image
              src={article.author.avatar.url}
              alt={article.author.avatar.alt || `${article.author.name} avatar`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground">
              {getInitials(article.author.name)}
            </div>
          )}
          <div className="flex flex-col text-left leading-tight">
            <span className="font-medium text-foreground">
              {article.author.name}
            </span>
            {/* Article published time */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {article.published.iso ? (
                <time dateTime={article.published.iso}>
                  {article.published.label}
                </time>
              ) : (
                // <span>{article.published.label}</span>
                <span>{"Jul 16, 2099"}</span>
              )}
              {/* Article category name */}
              {article.categoryName && (
                <>
                  <span aria-hidden>|</span>
                  <span>{article.categoryName}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Article Details (title & Link) */}
        <Link
          href={`/articles/${article.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl leading-tight font-semibold text-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          {article.title}
        </Link>
      </div>
    </article>
  );
}

function MobileInsightCard({ article }: { article: InsightArticle }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex overflow-hidden rounded-3xl border bg-background shadow-sm transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none md:hidden"
    >
      <div className="relative aspect-square min-h-[150px] flex-1 bg-muted/40">
        {article.cover ? (
          <Image
            src={article.cover.url}
            alt={article.cover.alt || article.title}
            fill
            sizes="50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            📄
          </div>
        )}
      </div>
      <div className="flex flex-[2] flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase"></div>
        <h3 className="text-lg leading-snug font-semibold text-foreground">
          {article.title}
        </h3>
        {/* font block */}
        <div className="mb-1 space-y-1">
          {/* by author：smaller font and grey color */}
          <span className="block text-xs text-muted-foreground">
            by {article.author.name}
          </span>

          {/* 描述：前景色（黑/深色） */}
          {article.description && (
            <p className="text-sm text-foreground">{article.description}</p>
          )}

          {/* Learn more indicator */}
          <span className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:decoration-2">
            Learn more
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function InsightCards() {
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
      <div className="mx-auto max-w-7xl">
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
