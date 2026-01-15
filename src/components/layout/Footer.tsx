import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                PERFUME HAVEN
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-300 font-body text-sm leading-relaxed">
              Curating the world's finest fragrances. Every scent is a story, 
              every bottle a treasured memory waiting to be created.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-amber-600 dark:text-amber-400">
              Shop
            </h3>
            <ul className="space-y-3">
              {["All Fragrances", "New Arrivals", "Best Sellers", "Collections", "Sale"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-amber-600 dark:text-amber-400">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", link: "/contact" },
                { label: "FAQs", link: "/" },
                { label: "Shipping Info", link: "/" },
                { label: "Returns", link: "/" },
                { label: "About Us", link: "/about" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-amber-600 dark:text-amber-400">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  Mumbai, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-slate-600 dark:text-slate-300 text-sm">+91 XXXX-XXXX-XX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-slate-600 dark:text-slate-300 text-sm">hello@perfumehaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center space-x-1">
              <span>© 2024 Perfume Haven. All rights reserved. Made with</span>
              <Heart className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
