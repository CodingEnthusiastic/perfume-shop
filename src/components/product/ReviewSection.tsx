import { useState } from "react";
import { Star, User } from "lucide-react";
import { useReviews, useAddReview } from "@/hooks/useReviews";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  productId: string;
}

export const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { data: reviews, isLoading } = useReviews(productId);
  const addReview = useAddReview();
  
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName.trim() || !comment.trim()) return;

    await addReview.mutateAsync({
      product_id: productId,
      author_name: authorName.trim(),
      rating,
      comment: comment.trim(),
    });

    setShowForm(false);
    setAuthorName("");
    setComment("");
    setRating(5);
  };

  const averageRating = reviews?.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="py-16 border-t border-border">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-medium text-foreground">
              Customer Reviews
            </h2>
            {reviews && reviews.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= Math.round(averageRating)
                          ? "text-amber fill-current"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
                </span>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
            className="rounded-sm"
          >
            Write a Review
          </Button>
        </div>

        {/* Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-secondary/30 p-6 rounded-sm space-y-4 animate-fade-in"
          >
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-foreground">
                Your Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6 transition-colors",
                        star <= rating
                          ? "text-amber fill-current"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-foreground">
                Your Name
              </label>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-foreground">
                Your Review
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this fragrance..."
                className="rounded-sm min-h-24"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={addReview.isPending}
                className="bg-primary hover:bg-primary/90 rounded-sm"
              >
                {addReview.isPending ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="p-6 bg-card rounded-sm border border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {review.author_name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4",
                          star <= review.rating
                            ? "text-amber fill-current"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-sm">
            <p className="text-muted-foreground font-body">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
