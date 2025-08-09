import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: {}
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            const username = action.payload;
            if (!state.users[username]) {
                state.users[username] = 1;
            } else {
                state.users[username] += 1;
            }
        },
        setUserCount: (state, action) => {
            const { username, count } = action.payload;
            state.users[username] = count;
        },
        setAllUsers: (state, action) => {
            state.users = action.payload; 
        },
        loadUsers(state, action) {
            state.users = action.payload || {};
        }
    }
})

export const { increment, setUserCount, setAllUsers, loadUsers } = counterSlice.actions;
export default counterSlice.reducer;

