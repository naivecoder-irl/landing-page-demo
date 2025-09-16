import Image from "next/image";
import Link from "next/link";

import type { InsightPreview } from "@/types/insights";

export default function MobileInsightCard({
  insightPreview,
}: {
  insightPreview: InsightPreview;
}) {
  return (
    <Link
      href={`/insights/${insightPreview.documentId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex overflow-hidden rounded-3xl border bg-background shadow-sm transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none md:hidden"
    >
      <div className="relative aspect-square min-h-[150px] flex-1 bg-muted/40">
        {insightPreview.coverImage ? (
          <Image
            src={insightPreview.coverImage.url}
            alt={insightPreview.coverImage.alt || insightPreview.title}
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
          {insightPreview.title}
        </h3>
        <div className="mb-1 space-y-1">
          <span className="block text-xs text-muted-foreground">
            by {insightPreview.author.name}
          </span>
          {insightPreview.description && (
            <p className="text-sm text-foreground">
              {insightPreview.description}
            </p>
          )}
          <span className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:decoration-2">
            Learn more
          </span>
        </div>
      </div>
    </Link>
  );
}
