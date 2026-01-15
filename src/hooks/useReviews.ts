import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewAPI } from "@/services/api";
import { Review } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export const useReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const response = await reviewAPI.getByProduct(productId);
      return response.reviews;
    },
    enabled: !!productId,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (review: any) => {
      const response = await reviewAPI.create(review);
      return response.review;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });
};
