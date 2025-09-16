import Image from "next/image";
import Link from "next/link";

import type { InsightArticle } from "@/types/insights";

export default function MobileInsightCard({
  article,
}: {
  article: InsightArticle;
}) {
  return (
    <Link
      href={`/insights/${article.documentId}`}
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
        <h3 className="text-xl leading-snug font-semibold text-foreground">
          {article.title}
        </h3>
        <div className="mb-1 space-y-1">
          <span className="block text-xs text-muted-foreground">
            by {article.author.name}
          </span>
          {article.description && (
            <p className="text-sm text-foreground">{article.description}</p>
          )}
          <span className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:decoration-2">
            Learn more
          </span>
        </div>
      </div>
    </Link>
  );
}
