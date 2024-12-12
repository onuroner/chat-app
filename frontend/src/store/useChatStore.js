import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersloading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUsersloading:true});

        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersloading:false});
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading:true});

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading:false});
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})
}))