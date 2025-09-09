import { store } from "@/app/store";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const state = store.getState()
    const token = state.auth.accessToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
