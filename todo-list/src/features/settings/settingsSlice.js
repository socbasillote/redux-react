import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backgroundColor: "#ffffff",
    showCompleted: true
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        loadSettings(state, action) {
            return { ...state, ...action.payload }
        },
        setBackgroundColor: (state, action) => {
            state.backgroundColor = action.payload;
            localStorage.setItem('settings', JSON.stringify(state));
        },
        toggleShowCompleted(state) {
            state.showCompleted = !state.showCompleted;
            localStorage.setItem('settings', JSON.stringify(state));
        }
    }
});

export const { setBackgroundColor, toggleShowCompleted, loadSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

