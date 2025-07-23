import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useBookStore = create((set) => ({
    books: [],
    loading : false,
    book : null,
    addBook : async(book) =>{
        try {
            const newBook = await axiosInstance.post("/book/add-book", book);
            set((state) => ({
                books: [...state.books, newBook.data.book]
            }));
            toast.success("Book added successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Failed to add book");
        }
    },
    getAllBooks: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/book/all-books");
            set({ books: res.data.books });
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch books");
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
            toast.error(error.response.data.message || "Failed to fetch book details");
        } finally {
            set({ loading: false });
        }
    },
}))

export default useBookStore;