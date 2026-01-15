import { create } from "zustand";
import api from "@/services/api";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string, size?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, size?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  fetchCart: () => Promise<void>;
  loadFromStorage: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,

  addItem: async (item) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/cart/add", {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
      });
      if (response.success) {
        set({ items: response.cart.items });
        localStorage.setItem("cart", JSON.stringify(response.cart.items));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Fallback to localStorage
      const state = get();
      const existingItem = state.items.find(
        (i) => i.productId === item.productId && i.size === item.size
      );

      if (existingItem) {
        set({
          items: state.items.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        });
      } else {
        set({ items: [...state.items, item] });
      }
      localStorage.setItem("cart", JSON.stringify(get().items));
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (productId, size) => {
    try {
      set({ isLoading: true });
      const response = await api.delete(`/cart/${productId}?size=${size || ""}`);
      if (response.success) {
        set({ items: response.cart.items });
        localStorage.setItem("cart", JSON.stringify(response.cart.items));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Fallback to localStorage
      const state = get();
      const updated = state.items.filter(
        (i) => !(i.productId === productId && i.size === size)
      );
      set({ items: updated });
      localStorage.setItem("cart", JSON.stringify(updated));
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId, quantity, size) => {
    try {
      set({ isLoading: true });
      const response = await api.put("/cart/update", {
        productId,
        quantity,
        size,
      });
      if (response.success) {
        set({ items: response.cart.items });
        localStorage.setItem("cart", JSON.stringify(response.cart.items));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Fallback to localStorage
      if (quantity <= 0) {
        get().removeItem(productId, size);
        return;
      }
      const state = get();
      const updated = state.items.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, quantity }
          : i
      );
      set({ items: updated });
      localStorage.setItem("cart", JSON.stringify(updated));
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    try {
      set({ isLoading: true });
      await api.delete("/cart");
      set({ items: [] });
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Fallback to localStorage
      set({ items: [] });
      localStorage.removeItem("cart");
    } finally {
      set({ isLoading: false });
    }
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/cart");
      if (response.success) {
        set({ items: response.cart.items });
        localStorage.setItem("cart", JSON.stringify(response.cart.items));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Fallback to localStorage
      get().loadFromStorage();
    } finally {
      set({ isLoading: false });
    }
  },

  loadFromStorage: () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        set({ items: JSON.parse(cart) });
      } catch (error) {
        console.error("Error loading cart from storage:", error);
      }
    }
  },
}));
