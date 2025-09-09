import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "..";
import axiosClient from "@/shared/services/axiosClient";
import type { AxiosResponse } from "axios";

export const authApi = {
    login: (request: LoginRequest) => axiosClient.post<LoginRequest, AxiosResponse<LoginResponse>>("/login", request),
    register: (request: RegisterRequest) => axiosClient.post<RegisterRequest, AxiosResponse<RegisterResponse>>("/register", request),
};
