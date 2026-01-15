import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CollectionsPage from "./pages/CollectionsPage";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { ThemeProvider } from "@/context/ThemeContext";
import api from "@/services/api";

const queryClient = new QueryClient();

// OAuth Callback Handler Component
const OAuthCallbackHandler = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setToken, loadFromStorage, isAuthenticated } = useAuthStore();
  const cartStore = useCartStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (token) {
      console.log("OAuth token found in URL, storing...");
      
      // Store the token immediately
      localStorage.setItem("authToken", token);
      setToken(token);
      
      // Fetch user data with the token
      const fetchUser = async () => {
        try {
          // Set up headers with the token
          const response = await fetch("http://localhost:8080/api/auth/me", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("User fetched:", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
              // Update auth store by loading from storage
              loadFromStorage();
              
              // Load cart from backend after auth
              try {
                await cartStore.fetchCart();
              } catch (error) {
                console.error("Error fetching cart:", error);
                cartStore.loadFromStorage();
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          loadFromStorage(); // Still try to load what we have
          cartStore.loadFromStorage();
        }
      };

      fetchUser();
      
      // Remove token from URL
      setSearchParams({});
    } else {
      // No OAuth callback, just load from storage normally
      loadFromStorage();
      cartStore.loadFromStorage();
      
      // If authenticated, also load cart from backend
      if (isAuthenticated) {
        try {
          cartStore.fetchCart();
        } catch (error) {
          console.error("Error fetching cart:", error);
          cartStore.loadFromStorage();
        }
      }
    }
  }, []);

  return <>{children}</>;
};

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <OAuthCallbackHandler>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </OAuthCallbackHandler>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
