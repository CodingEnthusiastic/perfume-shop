import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ReviewSection } from "@/components/product/ReviewSection";
import { useProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-sm" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 pb-16 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-display text-3xl text-foreground">
              Product Not Found
            </h1>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist.
            </p>
            <Button asChild variant="outline" className="rounded-sm">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 font-body text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground">{product?.name || "Product"}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ImageGallery images={product?.images || []} productName={product?.name || "Product"} />
            {product && <ProductInfo product={product} />}
          </div>

          {/* Reviews */}
          {product?.id && <ReviewSection productId={product.id} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
