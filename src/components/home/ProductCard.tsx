import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-white dark:bg-slate-800 rounded-sm overflow-hidden shadow-md dark:shadow-lg transition-all duration-500 hover:shadow-lg dark:hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-900/0 transition-all duration-500 group-hover:bg-slate-900/20 dark:group-hover:bg-white/10" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-slate-900 dark:text-white h-10 w-10 rounded-full shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                // Add to wishlist logic
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-slate-900 dark:text-white h-10 w-10 rounded-full shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>

          {/* Gender Badge */}
          <div className="absolute top-4 left-4">
            <span className={cn(
              "px-3 py-1 text-xs uppercase letter-spacing-wide rounded-sm backdrop-blur-sm font-semibold",
              product.gender === "feminine" && "bg-rose-500/90 dark:bg-rose-600/90 text-white",
              product.gender === "masculine" && "bg-blue-600/90 dark:bg-blue-700/90 text-white",
              product.gender === "unisex" && "bg-amber-600/90 dark:bg-amber-700/90 text-white"
            )}>
              {product.gender || "unisex"}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 text-xs uppercase letter-spacing-wide rounded-sm backdrop-blur-sm font-semibold bg-slate-800/80 dark:bg-slate-700/80 text-white">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="font-display text-xl font-medium text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
          <p className="font-body text-slate-600 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed">
            {product.short_description || product.description || "Premium fragrance"}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <p className="font-display text-2xl font-semibold text-amber-600 dark:text-amber-400">
              ${product.price}
            </p>
            <div className="flex items-center space-x-1">
              {product.sizes && Array.isArray(product.sizes) && product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="text-xs text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 px-2 py-0.5 rounded-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-amber-600/30 dark:group-hover:border-amber-400/30 rounded-sm pointer-events-none" />
      </div>
    </Link>
  );
};
