import { delay, http, HttpResponse } from "msw";
import type { ErrorResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/api";

export const authHandlers = [
    http.post<LoginResponse | ErrorResponse, LoginRequest>("/login", async ({ request }) => {
        await delay();
        const { username, password } = await request.json();
        if (username === "admin" && password === "Secret123!") {
            return HttpResponse.json<LoginResponse>({ token: "fake-jwt-token" });
        }
        return HttpResponse.json<ErrorResponse>({ message: "Invalid credentials" }, { status: 401 });
    }),

    http.post<RegisterResponse | ErrorResponse, RegisterRequest>("/register", async ({ request }) => {
        await delay();
        const { username } = await request.json();
        if (username === "taken") {
            return HttpResponse.json<ErrorResponse>({ message: "Username already taken" }, { status: 409 });
        }
        return HttpResponse.json<RegisterResponse>({ message: "Registered successfully!" });
    }),
];
