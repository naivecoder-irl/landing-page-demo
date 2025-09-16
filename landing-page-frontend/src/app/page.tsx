import Image from "next/image";
import Hero from "@/components/hero";
import Insights from "@/components/insights";
import InsightCards from "@/components/artricle-card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      {/* Global Navbar: rendered outside the main div */}
      <Navbar />
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
          <Hero />
          {/* <Insights /> */}
          <InsightCards />
          <Footer />
        </main>
      </div>
    </div>
  );
}
