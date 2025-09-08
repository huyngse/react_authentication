import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";
import type { LoginRequest, LoginResponse } from "@/types/api";
import axios from "axios";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
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
            state.token = null;
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
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
