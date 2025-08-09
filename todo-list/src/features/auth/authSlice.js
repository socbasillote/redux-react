import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentUser: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadAuthState(state, action) {
            return action.payload;
        },
        registerUser(state, action) {
            const { username, password } = action.payload;
            const exists = state.users.some(u => u.username === username);
            if (!exists) {
                state.users.push({ username, password });
            }
        },
        loginUser(state, action) {
            const { username, password } = action.payload;
            const user = state.users.find(
                u => u.username === username && u.password === password
            );
            if (user) {
                state.currentUser = { username };
            }
        },
        logoutUser(state) {
            state.currentUser = null;
        }
    }
})

export const { loadAuthState, registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
