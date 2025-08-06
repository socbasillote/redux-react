// src/features/timer/timerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedSettings = JSON.parse(localStorage.getItem('settings')) || {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
    longBreakInterval: 4,
    autoSwitch: true,
}


const initialState = {
  mode: 'pomodoro', // 'pomodoro' | 'short' | 'long'
  timeLeft: savedSettings.pomodoro, // default: 25 minutes in seconds
  isRunning: false,
  intervalId: null,
  pomodoroCount: 0, // increments after each pomodoro
  autoSwitch: false,
  settings: savedSettings,

  durations: {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  },
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setMode: (state, action) => {
        state.mode = action.payload;
        state.isRunning = false;
        state.intervalId = null;
        state.timeLeft = state.settings[action.payload]
    },
    start: (state, action) => {
      state.isRunning = true;
      state.intervalId = action.payload;
    },
    pause: (state) => {
      state.isRunning = false;
      state.intervalId = null;
    },
    reset: (state) => {
        state.timeLeft = state.settings[state.mode];
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
                        state.timeLeft = state.durations.long
                    } else {
                        state.mode = 'short';
                        state.timeLeft = state.durations.short
                    }
                    state.isRunning = true;
                }
            } else if (state.mode === 'short' || state.mode === 'long') {
                if (state.autoSwitch) {
                    state.mode = 'pomodoro';
                    state.timeLeft = state.durations.pomodoro
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
                state.timeLeft = state.durations.long
            } else {
                state.mode = 'short';
                state.timeLeft = state.durations.short
            }
        } else {
            state.mode = 'pomodoro';
            state.timeLeft = state.durations.pomodoro
        }
        state.isRunning = false;
        state.intervalId = null;
    },
    toggleAutoSwitch: (state) => {
        state.autoSwitch = !state.autoSwitch;
    },
    setDurations: (state, action) => {
        state.durations = action.payload;
    },
    setTimeLeftFromMode: (state) => {
        state.timeLeft = state.durations[state.mode]
    }
  },
});

export const { start, pause, reset, tick, switchMode, setMode, toggleAutoSwitch, setDurations, setTimeLeftFromMode } = timerSlice.actions;
export default timerSlice.reducer;
