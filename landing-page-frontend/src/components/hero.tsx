import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left Column - Image of Cover */}
        <div className="relative">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            {/* TODO Replace with actual cover image */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <span className="text-2xl">🚀</span>
              </div>
              <p className="text-muted-foreground">The Cover Image</p>
            </div>
          </div>
        </div>
        {/* Right Column - Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              <span className="text-primary">Landing Pages</span>
            </h1>
            <p className="max-w-lg text-xl text-muted-foreground">
              Responsive landing pages with shadcn/ui
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="text-base">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
