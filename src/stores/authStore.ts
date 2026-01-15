import { create } from "zustand";
import { authAPI } from "@/services/api";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: any;
  profileImage?: string;
  authProvider: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  setToken: (token: string) => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.register(data);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.login(data);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getMe: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.getMe();
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.updateProfile(data);
      set({
        user: response.user,
        isLoading: false,
      });
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error: any) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    localStorage.setItem("authToken", token);
  },

  loadFromStorage: () => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    console.log("Loading from storage - token:", !!token, "user:", !!user);
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    } else if (token) {
      // Even if no user data, if we have a token, we're authenticated
      set({
        token,
        isAuthenticated: true,
      });
    }
  },
}));
