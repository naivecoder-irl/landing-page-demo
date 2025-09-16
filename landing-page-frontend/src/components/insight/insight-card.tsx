import qs from "qs";
import type {
  InsightImage,
  InsightPreview,
  StrapiArticlesResponse,
  StrapiMedia,
} from "@/types/insights";

import DesktopInsightCard from "./desktop-insight-card";
import MobileInsightCard from "./mobile-insight-card";

const STRAPI_URL: string =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

function resolveMedia(
  media: StrapiMedia | undefined,
  preferredFormats: string[] = ["large", "medium", "small", "thumbnail"],
): InsightImage | null {
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

function formatPublishedAt(date: string | null | undefined) {
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

async function getInsights(): Promise<InsightPreview[]> {
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
      // hard-coded pagination for demo
      pagination: {
        pageSize: 20,
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

  const json = (await res.json()) as StrapiArticlesResponse;

  // TODO delete after debugging
  console.log(json);

  return (json.data ?? []).map((item) => {
    const coverImage = resolveMedia(item.cover);
    const author = item.author ?? null;
    const avatarImage = resolveMedia(author?.avatar, [
      "thumbnail",
      "small",
      "medium",
    ]);
    const publishedAt = formatPublishedAt(item.publishedDate ?? null);

    return {
      id: item.id,
      documentId: item.documentId ?? item.slug ?? `${item.id}`,
      slug: item.slug ?? `${item.id}`,
      title: item.title ?? "Title Not Found",
      description: item.description ?? "",
      categoryName: item.category?.name ?? "Press Release",
      publishedAt,
      coverImage,
      author: {
        name: author?.name ?? "Sam Plane",
        avatarImage,
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
