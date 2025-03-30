import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../StoreSlices/StoreSlics";


export const store = configureStore({
    reducer: {
      todo :  todoReducer,
    },
});

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
