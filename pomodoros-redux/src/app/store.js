import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../features/timer/timerSlice';
import settingsReducer from '../features/settings/settingsSlice';
import themeReducer from '../features/theme/themeSlice'
import { loadFromLocalStorage } from '../utils/localStorage';

const preloadedState = {
    settings: loadFromLocalStorage('settings', undefined),
    theme: loadFromLocalStorage('theme', undefined),
}
export const store = configureStore({
    reducer: {
        timer: timerReducer,
        settings: settingsReducer,
        theme: themeReducer,
    },
    preloadedState,
});