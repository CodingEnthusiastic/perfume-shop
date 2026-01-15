import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, Heart, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const cartStore = useCartStore();
  const cartItemsCount = cartStore.getTotalItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              PERFUME HAVEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-body text-sm letter-spacing-wide uppercase transition-colors relative py-2",
                  location.pathname === link.href
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
                  "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-600 dark:after:bg-amber-400 after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                  location.pathname === link.href && "after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              onClick={() => navigate("/shop")}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white relative"
              onClick={() => navigate("/profile")}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>{user?.firstName || user?.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-1"
                >
                  <span>My Account</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-body text-sm letter-spacing-wide uppercase py-2 transition-colors",
                  location.pathname === link.href
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-600 dark:text-slate-300"
                onClick={() => navigate("/shop")}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-600 dark:text-slate-300"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-600 dark:text-slate-300 relative"
                onClick={() => navigate("/shop")}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-600 dark:text-slate-300"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
            {isAuthenticated ? (
              <>
                <div className="text-sm text-slate-600 dark:text-slate-300 py-2 px-4 border-t border-slate-200 dark:border-slate-700">
                  Welcome, {user?.firstName || user?.email}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className="w-full mt-2"
                >
                  My Account
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 flex items-center justify-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
