import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import todosReducer from "../features/todos/todosSlice"
import { saveTodosMiddleware } from "../features/middleware/saveTodosMiddleware";
import { saveAuthMiddleware } from "../features/middleware/saveAuthMiddleware";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveAuthMiddleware, saveTodosMiddleware),
});