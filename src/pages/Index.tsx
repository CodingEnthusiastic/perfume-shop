import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Features } from "@/components/home/Features";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <Features />
        <FeaturedProducts />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
