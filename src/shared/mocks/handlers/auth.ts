import type { ErrorResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/features/auth/types";
import { delay, http, HttpResponse } from "msw";

let accessToken = 'initial-access-token'

export const authHandlers = [
    http.post<LoginResponse | ErrorResponse, LoginRequest>("/login", async ({ request }) => {
        await delay();
        const { username, password } = await request.json();
        if (!username || !password) {
            return HttpResponse.json<ErrorResponse>({ message: "Missing username or password" }, { status: 400 })
        }
        if (username === "admin" && password === "Secret123!") {
            return HttpResponse.json<LoginResponse>({ username: "admin", accessToken: accessToken, roles: ["admin"] });
        } else if (username === "editor" && password === "Secret123!") {
            return HttpResponse.json<LoginResponse>({ username: "editor", accessToken: accessToken, roles: ["editor"] });
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
