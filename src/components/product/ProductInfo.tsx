import { useState } from "react";
import { Heart, ShoppingBag, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cartStore = useCartStore();
  const { isAuthenticated, token } = useAuthStore();

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        image: product.images?.[0],
      };

      await cartStore.addItem(cartItem);

      toast({
        title: "Added to cart",
        description: `${product.name} (${selectedSize}) added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error adding to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category & Name */}
      <div className="space-y-4">
        <p className="font-body text-primary letter-spacing-elegant uppercase text-sm">
          {product.category}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          {product.name}
        </h1>
        <p className="font-display text-3xl text-primary font-medium">
          ${product.price}
        </p>
      </div>

      {/* Short Description */}
      <p className="font-body text-muted-foreground text-lg leading-relaxed">
        {product.short_description}
      </p>

      {/* Size Selection */}
      <div className="space-y-4">
        <p className="font-body text-sm font-medium text-foreground">
          Select Size
        </p>
        <div className="flex flex-wrap gap-3">
          {product.sizes && product.sizes.length > 0 ? (
            product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-6 py-3 rounded-sm border font-body text-sm transition-all",
                  selectedSize === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                )}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No sizes available</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          disabled={isAddingToCart || !selectedSize}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-body letter-spacing-wide uppercase text-sm h-14 rounded-sm shadow-elegant disabled:opacity-50"
          onClick={handleAddToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "h-14 rounded-sm transition-all",
            isWishlisted
              ? "bg-rose/10 border-rose text-rose"
              : "border-border text-foreground hover:border-primary"
          )}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-14 rounded-sm border-border text-foreground hover:border-primary"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2 text-sm">
        <Check className="h-4 w-4 text-green-600" />
        <span className="text-muted-foreground">
          {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
        </span>
      </div>

      {/* Fragrance Notes */}
      <div className="space-y-6 pt-8 border-t border-border">
        <h3 className="font-display text-xl font-medium text-foreground">
          Fragrance Notes
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            <p className="font-body text-xs uppercase letter-spacing-wide text-muted-foreground">
              Top Notes
            </p>
            <ul className="space-y-1">
              {product.notes?.top && product.notes.top.length > 0 ? (
                product.notes.top.map((note) => (
                  <li key={note} className="font-body text-sm text-foreground">
                    {note}
                  </li>
                ))
              ) : (
                <li className="font-body text-sm text-muted-foreground">No data</li>
              )}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-body text-xs uppercase letter-spacing-wide text-muted-foreground">
              Heart Notes
            </p>
            <ul className="space-y-1">
              {product.notes?.heart && product.notes.heart.length > 0 ? (
                product.notes.heart.map((note) => (
                  <li key={note} className="font-body text-sm text-foreground">
                    {note}
                  </li>
                ))
              ) : (
                <li className="font-body text-sm text-muted-foreground">No data</li>
              )}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-body text-xs uppercase letter-spacing-wide text-muted-foreground">
              Base Notes
            </p>
            <ul className="space-y-1">
              {product.notes?.base && product.notes.base.length > 0 ? (
                product.notes.base.map((note) => (
                  <li key={note} className="font-body text-sm text-foreground">
                    {note}
                  </li>
                ))
              ) : (
                <li className="font-body text-sm text-muted-foreground">No data</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div className="space-y-4 pt-8 border-t border-border">
        <h3 className="font-display text-xl font-medium text-foreground">
          Description
        </h3>
        <p className="font-body text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};
