import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import {
    persistReducer,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["username", "token", "roles"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
