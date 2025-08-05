// src/features/timer/timerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'pomodoro', // 'pomodoro' | 'short' | 'long'
  timeLeft: 3, // default: 25 minutes in seconds
  isRunning: false,
  intervalId: null,
  pomodoroCount: 0, // increments after each pomodoro
  autoSwitch: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start: (state, action) => {
      state.isRunning = true;
      state.intervalId = action.payload;
    },
    pause: (state) => {
      state.isRunning = false;
      state.intervalId = null;
    },
    reset: (state) => {
        let newTime;
        if (state.mode === 'pomodoro') newTime = 25 * 60;
        if (state.mode === 'short') newTime = 5 * 60;
        if (state.mode === 'long') newTime = 15 * 60;
        state.timeLeft = newTime;
        state.isRunning = false;
        state.intervalId = null
    },
    tick: (state) => {
        if (state.isRunning && state.timeLeft >= 0) {
            state.timeLeft -= 1;
        } else if (state.isRunning && state.timeLeft < 0){
            state.isRunning = false;
            state.intervalId = null;

            if (state.mode === 'pomodoro') {
                state.pomodoroCount += 1;

                if (state.autoSwitch) {
                    
                    if (state.pomodoroCount % 4 === 0) {
                        state.mode = 'long';
                        state.timeLeft = 15 * 60;
                    } else {
                        state.mode = 'short';
                        state.timeLeft = 6;
                    }
                    state.isRunning = true;
                }
            } else if (state.mode === 'short' || state.mode === 'long') {
                if (state.autoSwitch) {
                    state.mode = 'pomodoro';
                    state.timeLeft = 25 * 60;
                    state.isRunning = true;
                }
            }
        }
    },
    switchMode: (state) => {
        if (state.mode === 'pomodoro') {
            state.pomodoroCount += 1;
            if (state.pomodoroCount % 4 === 0) {
                state.mode = 'long';
                state.timeLeft = 15 * 60;
            } else {
                state.mode = 'short';
                state.timeLeft = 6;
            }
        } else {
            state.mode = 'pomodoro';
            state.timeLeft = 3;
        }
        state.isRunning = false;
        state.intervalId = null;
    },
    setMode: (state, action) => {
        state.mode = action.payload;
        state.isRunning = false;
        state.intervalId = null;
        if (action.payload === 'pomodoro') state.timeLeft = 25 * 60;
        if (action.payload === 'short') state.timeLeft = 5 * 60;
        if (action.payload === 'long') state.timeLeft = 15 * 60;
    },
    toggleAutoSwitch: (state) => {
        state.autoSwitch = !state.autoSwitch;
    }
  },
});

export const { start, pause, reset, tick, switchMode, setMode, toggleAutoSwitch } = timerSlice.actions;
export default timerSlice.reducer;
