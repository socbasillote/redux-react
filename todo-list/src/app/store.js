import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import todosReducer from "../features/todos/todosSlice"
import settingsReducer from "../features/settings/settingsSlice"
import { saveAuthMiddleware } from "../features/middleware/saveAuthMiddleware";
import { persistPerUserMiddleware } from "../features/middleware/persistPerUserMiddleware";

const loadInitialState = () => {
    try {
        const savedAuth = JSON.parse(localStorage.getItem('authState'));
        const currentUser = savedAuth?.currentUser?.username;

        if (currentUser) {
            const savedState = localStorage.getItem(`appState_${currentUser}`);
            if (savedState) {
                return JSON.parse(savedState);
            }
        }
    } catch (e) {
        console.error("Failed to load initial per-user state", e);
    }
    return undefined;
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
        settings: settingsReducer,
    },
    preloadedState: loadInitialState(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveAuthMiddleware, persistPerUserMiddleware),
});