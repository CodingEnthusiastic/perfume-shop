import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "feminine",
    name: "Feminine Elegance",
    description: "Delicate florals and soft musks for the modern woman",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=600&fit=crop",
    count: 12,
  },
  {
    id: "masculine",
    name: "Masculine Power",
    description: "Bold woods and aromatic spices for the confident man",
    image: "https://images.unsplash.com/photo-1547887538-047f814bfb64?w=800&h=600&fit=crop",
    count: 10,
  },
  {
    id: "unisex",
    name: "Universal Appeal",
    description: "Versatile scents that transcend boundaries",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop",
    count: 8,
  },
];

const CollectionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="font-body text-primary letter-spacing-elegant uppercase text-sm">
              Explore
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
              Our Collections
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover curated collections designed to match every personality
              and occasion.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/shop?category=${collection.id}`}
                className="group relative overflow-hidden rounded-sm animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <div>
                    <p className="font-body text-gold text-xs uppercase letter-spacing-wide mb-2">
                      {collection.count} Fragrances
                    </p>
                    <h2 className="font-display text-2xl font-medium text-cream">
                      {collection.name}
                    </h2>
                    <p className="font-body text-cream/70 text-sm mt-2">
                      {collection.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-gold font-body text-sm uppercase letter-spacing-wide group-hover:translate-x-2 transition-transform">
                    <span>Explore Collection</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Banner */}
          <div className="mt-16 relative overflow-hidden rounded-sm bg-gradient-hero">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/30 blur-3xl" />
            </div>
            
            <div className="relative p-12 md:p-16 text-center">
              <p className="font-body text-gold text-sm uppercase letter-spacing-wide mb-4">
                New Season
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-4">
                Spring/Summer 2024
              </h2>
              <p className="font-body text-cream/70 max-w-xl mx-auto mb-8">
                Introducing our latest collection featuring fresh, vibrant scents 
                inspired by Mediterranean gardens and coastal breezes.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground font-body letter-spacing-wide uppercase text-sm px-8 py-4 rounded-sm shadow-elegant transition-all hover:shadow-hover"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionsPage;
