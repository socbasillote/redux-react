import { createSlice } from '@reduxjs/toolkit';

const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));

const initialState = savedSettings || {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
    longBreakInterval: 4,
    autoSwitch: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setPomodoroDuration(state, action) {
            state.pomodoro = action.payload;
            localStorage.setItem('pomodoroSettings', JSON.stringify(state));
        },
        setShortBreakDuration(state, action) {
            state.short = action.payload;
            localStorage.setItem('pomodoroSettings', JSON.stringify(state));
        },
        setLongBreakDuration(state, action) {
            state.long = action.payload;
            localStorage.setItem('pomodoroSettings', JSON.stringify(state));
        },
        setLongBreakInterval: (state, action) => {
            state.longBreakInterval = action.payload;
            localStorage.setItem('pomodoroSettings', JSON.stringify(state));
        },
        toggleAutoSwitch(state) {
            state.autoSwitch = !state.autoSwitch;
            localStorage.setItem('pomodoroSettings', JSON.stringify(state));
        }
    }
})


export const {
    setPomodoroDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setLongBreakInterval,
    toggleAutoSwitch,
} = settingsSlice.actions;

export default settingsSlice.reducer;