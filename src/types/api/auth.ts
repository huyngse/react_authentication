export interface RegisterRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    accessToken: string;
    roles: string[];
}

export interface ErrorResponse {
    message: string;
}
