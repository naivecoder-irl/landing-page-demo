import Image from "next/image";
import Link from "next/link";

import type { InsightPreview } from "@/types/insights";

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials.slice(0, 2) || "?";
}

export default function DesktopInsightCard({
  insightPreview,
}: {
  insightPreview: InsightPreview;
}) {
  return (
    <article className="hidden overflow-hidden rounded-3xl border bg-background shadow-sm transition focus-within:ring-2 focus-within:ring-primary/40 hover:shadow-md md:grid md:grid-rows-2">
      <div className="relative min-h-[220px] border-r bg-muted/40">
        {insightPreview.coverImage ? (
          <Image
            src={insightPreview.coverImage.url}
            alt={insightPreview.coverImage.alt || insightPreview.title}
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
          {insightPreview.author.avatarImage ? (
            <Image
              src={insightPreview.author.avatarImage.url}
              alt={
                insightPreview.author.avatarImage.alt ||
                `${insightPreview.author.name} avatar`
              }
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground">
              {getInitials(insightPreview.author.name)}
            </div>
          )}
          <div className="flex flex-col text-left leading-tight">
            <span className="font-medium text-foreground">
              {insightPreview.author.name}
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {insightPreview.publishedAt.iso ? (
                <time dateTime={insightPreview.publishedAt.iso}>
                  {insightPreview.publishedAt.label}
                </time>
              ) : (
                <span>{"Jul 16, 2099"}</span>
              )}
              {insightPreview.categoryName && (
                <>
                  <span aria-hidden>|</span>
                  <span>{insightPreview.categoryName}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Link
          href={`/insights/${insightPreview.documentId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl leading-tight font-semibold text-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          {insightPreview.title}
        </Link>
      </div>
    </article>
  );
}
