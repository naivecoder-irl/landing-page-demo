import Image from "next/image";
import Link from "next/link";

import type { InsightArticle } from "@/types/insights";

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials.slice(0, 2) || "?";
}

export default function DesktopInsightCard({
  article,
}: {
  article: InsightArticle;
}) {
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
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {article.published.iso ? (
                <time dateTime={article.published.iso}>
                  {article.published.label}
                </time>
              ) : (
                <span>{"Jul 16, 2099"}</span>
              )}
              {article.categoryName && (
                <>
                  <span aria-hidden>|</span>
                  <span>{article.categoryName}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Link
          href={`/insights/${article.documentId}`}
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
