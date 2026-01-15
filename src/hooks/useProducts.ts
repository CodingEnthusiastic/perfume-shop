import { useQuery } from "@tanstack/react-query";
import { productAPI } from "@/services/api";
import { Product } from "@/types/product";

export const useProducts = (params: any = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await productAPI.getAll(params);
      return response.products;
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await productAPI.getFeatured();
      return response.products;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await productAPI.getById(id);
      // Handle both response.product and direct product response
      return response.product || response;
    },
    enabled: !!id,
  });
};

