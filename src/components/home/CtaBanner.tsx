import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const CtaBanner = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-gold/10 rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-gold/10 rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-gold text-sm font-body">Limited Time Offer</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream leading-tight">
              Get 20% Off Your First Order
            </h2>
            <p className="font-body text-cream/70 text-lg leading-relaxed">
              Subscribe to our newsletter and receive an exclusive discount code. 
              Be the first to know about new arrivals and special promotions.
            </p>
          </div>

          {/* Email Form */}
          <div className="w-full lg:w-auto">
            <div className="bg-card/10 backdrop-blur-sm p-8 rounded-sm border border-cream/10 max-w-md mx-auto lg:mx-0">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-sm text-cream placeholder:text-cream/50 focus:outline-none focus:border-gold transition-colors font-body"
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body letter-spacing-wide uppercase text-sm h-12 rounded-sm shadow-elegant"
                >
                  Subscribe Now
                </Button>
              </form>
              <p className="text-cream/40 text-xs mt-4 text-center">
                By subscribing, you agree to our Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
