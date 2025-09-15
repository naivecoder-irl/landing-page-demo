import Image from "next/image";
import Insights from "@/components/insights";
import Hero from "@/components/hero";
export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Hero />
        <Insights />
      </main>
    </div>
  );
}
