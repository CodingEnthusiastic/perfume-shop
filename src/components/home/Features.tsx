import { Truck, Shield, RefreshCw, Gift } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $100",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "100% authentic products from trusted sources",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
  {
    icon: Gift,
    title: "Gift Wrapping",
    description: "Luxury gift packaging available",
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center space-y-4 p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
