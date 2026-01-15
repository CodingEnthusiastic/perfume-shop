import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-sm overflow-hidden bg-secondary group">
        <img
          src={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isZoomed && "scale-150 cursor-zoom-out"
          )}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden transition-all",
                currentIndex === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
