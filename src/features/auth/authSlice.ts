import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { LoginRequest, LoginResponse } from "./types";
import { authApi } from ".";

interface AuthState {
    username: string | null;
    accessToken: string | null;
    roles: string[];
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    username: null,
    accessToken: null,
    roles: [],
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await authApi.login(credentials);
        return response.data;
    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data.message || "Login failed");
        }
        return rejectWithValue("Login failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.accessToken = null;
            state.username = null;
            state.roles = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.username = action.payload.username;
                state.accessToken = action.payload.accessToken;
                state.roles = action.payload.roles;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
