import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useBookStore = create((set) => ({
    books: [],
    book: null,
    loading: false,
    totalPages: 1,
    currentPage: 1,
    totalBooks: 0,

    addBook: async (book) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/book/add-book", book);
            set((state) => ({
                books: [...state.books, res.data.book],
            }));
            toast.success("Book added successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add book");
        } finally {
            set({ loading: false });
        }
    },
    getAllBooks: async ({ page = 1, limit = 9, author = "", genre = "", title = "" } = {}) => {
        set({ loading: true });
        try {
            const queryParams = new URLSearchParams({
                page,
                limit,
                author,
                genre,
                title,
            });

            const res = await axiosInstance.get(`/book/all-books?${queryParams.toString()}`);

            set({
                books: res.data.books,
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage,
                totalBooks: res.data.totalBooks,
            });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch books");
        } finally {
            set({ loading: false });
        }
    },
    getBookById: async (id) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`/book/${id}`);
            set({ book: res.data.book });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch book details");
        } finally {
            set({ loading: false });
        }
    },
}));

export default useBookStore;
