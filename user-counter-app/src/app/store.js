import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';

import saveCountsMiddleware from '../middleware/saveCountsMiddleware';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(saveCountsMiddleware),
})