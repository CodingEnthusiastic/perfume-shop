import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const categories = ["all", "feminine", "masculine", "unisex"];

const ShopPage = () => {
  const { data: products, isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get initial filter from URL params
  useEffect(() => {
    const gender = searchParams.get("gender");
    if (gender && categories.includes(gender)) {
      setSelectedCategory(gender);
    }
  }, [searchParams]);

  const filteredProducts = products?.filter((product) =>
    selectedCategory === "all" ? true : product.gender === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
              Our Collection
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Explore our curated selection of exquisite fragrances, each crafted
              to perfection with the finest ingredients.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-secondary/50 rounded-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-6 py-2 font-body text-sm uppercase letter-spacing-wide rounded-sm transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
              <p className="text-destructive">
                Failed to load products. Please try again.
              </p>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
