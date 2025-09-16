import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

import LeadForm from "@/components/lead-form";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

// TODO refine type denifition for this method
async function getCover() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/cover?populate=image`, {
      // Always fetch fresh during development
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    const data = json?.data;
    const image = data?.image;
    if (!image) return null;

    // Prefer largest available format, fall back to original
    const candidate =
      image.formats?.large?.url ||
      image.formats?.medium?.url ||
      image.formats?.small?.url ||
      image.url;

    if (!candidate) return null;

    const url = candidate.startsWith("http")
      ? candidate
      : `${STRAPI_URL}${candidate}`;
    const width = image.formats?.large?.width || image.width || 1200;
    const height = image.formats?.large?.height || image.height || 900;
    const alt = image.alternativeText || data.title || "Cover image";

    return { url, width, height, alt } as {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
  } catch (e) {
    return null;
  }
}

export default async function Hero() {
  const cover = await getCover();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Left Column - Image of Cover */}
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              {/* Aspect box gives a real width for the fill image and keeps layout stable */}
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
                {cover ? (
                  <Image
                    src={cover.url}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      The Cover Image
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Lead Form */}
          <div className="w-full">
            {/* keep it full-width inside its column; add an inner max-w if you want it visually narrower */}
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
