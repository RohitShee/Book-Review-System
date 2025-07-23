// store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  loading : false,
  signup : async (userData) =>{
    set({ loading: true });
    try {
        const res = await axiosInstance.post("/auth/signup", userData);
        set({ user: res.data.user});
        toast.success("Signup successful");
    } catch (error) {
        toast.error(error.response.data.message || "Signup failed");
    }finally{
        set({ loading: false });
    }
  },
    login: async (userData) => {
        set({ loading: true });
        try {
        const res = await axiosInstance.post("/auth/login", userData);
        set({ user: res.data.user });
        toast.success("Login successful");
        } catch (error) {
        toast.error(error.response.data.message || "Login failed");
        } finally {
        set({ loading: false });
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            await axiosInstance.post("/auth/logout");
            set({ user: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed");
        } finally {
            set({ loading: false });
        }
    },
    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ user: res.data });
        } catch (error) {
            set({ user: null });
            toast.error(error.response.data.message || "Authentication failed");
        } finally {
            set({ loading: false });
        }
    },
}));

export default useAuthStore;
