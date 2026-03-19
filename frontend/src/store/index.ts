import { configureStore } from "@reduxjs/toolkit";
import authReducerUsers from "./reducers/authReducers/auth"

export const  store = configureStore({
    reducer: {
        authUsers: authReducerUsers,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
