import Hero from "@/components/hero";

import InsightCard from "@/components/insight-card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      {/* Global Navbar: rendered outside the main div */}
      <Navbar />
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 font-sans sm:p-20">
        <main className="row-start-2 flex w-full flex-col items-stretch gap-[32px]">
          <Hero />
          <InsightCard />
          <Footer />
        </main>
      </div>
    </div>
  );
}
