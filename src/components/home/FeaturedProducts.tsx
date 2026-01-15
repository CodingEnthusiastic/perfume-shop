import { useFeaturedProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useFeaturedProducts();

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-body text-amber-600 dark:text-amber-400 letter-spacing-elegant uppercase text-sm">
            Curated Selection
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-white">
            Featured Fragrances
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover our most beloved scents, carefully crafted to evoke emotion and 
            leave a lasting impression.
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] rounded-sm" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-1/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">Failed to load products. Please try again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products?.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body letter-spacing-wide uppercase text-sm px-8 h-12 rounded-sm transition-all"
          >
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
