import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const useReviewStore = create((set) => ({
    reviews : [],
    reviewLoading : false,
    avg_rating : 0,
    getReviewsByBookId: async (bookId) => {
        set({ reviewLoading: true });
        try {
            const res = await axiosInstance.get(`/review/reviews/${bookId}`);
            console.log(res.data.reviews)
           set({reviews: res.data.reviews, avg_rating: res.data.avg_rating });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch reviews");
            return [];
        } finally {
            set({ reviewLoading: false });
        }
    },
    addReview: async (review) => {
        set({ reviewLoading: true });
        try {
            const res = await axiosInstance.post("/review/add-review", review);
            set((state) => ({
                reviews: res.data.reviews,
                avg_rating: res.data.avg_rating
            }));
            toast.success("Review added successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add review");
        } finally {
            set({ reviewLoading: false });
        }
    },
    clearReviews : () => set({ reviews: [], avg_rating: 0, reviewLoading: false }),
}));
export default useReviewStore;