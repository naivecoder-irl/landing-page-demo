import Navbar from "@/components/navbar";
import InsightCards from "@/components/artricle-card";

export default function Page() {
  return (
    <div>
      {/* Global Navbar: rendered outside the main div */}
      <Navbar />
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
          <InsightCards />
        </main>
      </div>
    </div>
  );
}
