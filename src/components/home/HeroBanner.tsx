import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroBanner = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950">
      {/* Light Mode Background */}
      <div className="absolute inset-0 bg-white dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />
      </div>

      {/* Dark Mode Background */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Grid pattern overlay - light mode */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-white/[0.02] bg-[size:50px_50px] dark:hidden" />
      
      {/* Grid pattern overlay - dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-600/20 dark:to-orange-600/20 border border-amber-300 dark:border-amber-500/30 rounded-full px-4 py-2 w-fit backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase letter-spacing-wider">
                Premium Collection
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r text-slate-900 dark:text-white">
                  Perfect Scent
                </span>
              </h1>
              
              <p className="font-body text-slate-600 dark:text-slate-300 text-lg max-w-lg leading-relaxed">
                Explore our premium collection of handcrafted fragrances. Each scent tells a unique story, 
                blending exotic ingredients from around the world into unforgettable experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 dark:from-amber-300 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-700 text-white font-semibold px-8 h-12 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Link to="/shop" className="flex items-center justify-center">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-slate-800 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-amber-600 dark:hover:border-amber-400 font-semibold px-8 h-12 rounded-lg transition-all"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-300 dark:border-slate-700/50">
              <div>
                <p className="font-display text-3xl font-bold text-amber-600 dark:text-amber-400">50+</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Premium Scents</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-orange-600 dark:text-orange-400">10K+</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-pink-600 dark:text-pink-400">4.9★</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Gradient glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 dark:from-amber-500/30 to-transparent rounded-3xl blur-2xl" />
              
              {/* Main perfume image */}
              <div className="relative z-10 bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-200 dark:to-slate-900 rounded-2xl p-4 border border-slate-300 dark:border-slate-700 backdrop-blur-sm shadow-2xl">
                <img
                  src="../../../public/favicon.jpg"
                  alt="Premium Perfume Bottle"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>

              {/* Floating info card */}
              {/* <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 border border-amber-500/30 dark:border-amber-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 dark:from-amber-400 to-orange-700 dark:to-orange-600 flex items-center justify-center">
                    <GripVertical className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold">Best Seller</p>
                    <p className="text-amber-600 dark:text-amber-400 text-sm">Noir Mystique</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
