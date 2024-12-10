import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checking auth", error);
            set({authUser:null});
        } finally {
            set({isCheckingAuth:false});
        }
    }
}));