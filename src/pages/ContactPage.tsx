import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="font-body text-primary letter-spacing-elegant uppercase text-sm">
              Get in Touch
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
              Contact Us
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about our
              fragrances or need assistance, we're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-sm shadow-card">
              <h2 className="font-display text-2xl font-medium text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John"
                      required
                      className="rounded-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Doe"
                      required
                      className="rounded-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    required
                    className="rounded-sm min-h-32"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body letter-spacing-wide uppercase text-sm h-12 rounded-sm"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-medium text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-medium text-foreground">
                        Visit Us
                      </h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">
                        123 Luxury Avenue
                        <br />
                        Paris, France 75001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-medium text-foreground">
                        Call Us
                      </h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">
                        +33 1 23 45 67 89
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-medium text-foreground">
                        Email Us
                      </h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">
                        hello@essence.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-medium text-foreground">
                        Opening Hours
                      </h3>
                      <p className="font-body text-muted-foreground text-sm mt-1">
                        Mon - Fri: 9:00 AM - 7:00 PM
                        <br />
                        Sat - Sun: 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-secondary h-64 rounded-sm flex items-center justify-center">
                <p className="text-muted-foreground font-body">
                  Interactive Map
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
