import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16 space-y-4">
            <p className="font-body text-primary letter-spacing-elegant uppercase text-sm">
              Our Story
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
              About ESSENCE
            </h1>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=800&fit=crop"
                  alt="Perfume crafting"
                  className="w-full h-auto rounded-sm shadow-elegant"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-medium text-foreground">
                  A Legacy of Excellence
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Founded in 1999, ESSENCE has been at the forefront of luxury
                  perfumery for over two decades. Our journey began in the
                  picturesque town of Grasse, France – the perfume capital of the
                  world.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Every fragrance we create is a masterpiece, blending rare
                  ingredients sourced from the finest regions across the globe.
                  From Bulgarian rose fields to Indian sandalwood forests, we
                  leave no stone unturned in our pursuit of olfactory perfection.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 md:order-1">
                <h2 className="font-display text-3xl font-medium text-foreground">
                  Our Philosophy
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We believe that fragrance is more than just a scent – it's an
                  extension of your personality, a way to express your innermost
                  self without words. Each ESSENCE creation tells a unique story,
                  designed to evoke emotions and create lasting memories.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Our master perfumers work tirelessly, combining traditional
                  techniques with innovative approaches to craft fragrances that
                  are both timeless and contemporary.
                </p>
              </div>
              <div className="md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&h=800&fit=crop"
                  alt="Perfume bottles"
                  className="w-full h-auto rounded-sm shadow-elegant"
                />
              </div>
            </div>

            {/* Values */}
            <div className="py-12 border-t border-border">
              <h2 className="font-display text-3xl font-medium text-foreground text-center mb-12">
                Our Values
              </h2>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  {
                    title: "Quality",
                    description:
                      "We source only the finest ingredients, ensuring every drop meets our exacting standards.",
                  },
                  {
                    title: "Sustainability",
                    description:
                      "Committed to ethical sourcing and eco-friendly practices in everything we do.",
                  },
                  {
                    title: "Artistry",
                    description:
                      "Each fragrance is crafted by master perfumers with decades of experience.",
                  },
                ].map((value) => (
                  <div key={value.title} className="text-center space-y-4">
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {value.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
