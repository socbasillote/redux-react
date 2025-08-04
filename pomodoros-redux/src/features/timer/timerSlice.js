import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  mode: 'pomodoro', // 'pomodoro' | 'short' | 'long'
  timeLeft: 1500,   // 25 mins default (in seconds)
  isRunning: false,
  intervalId: null,
  pomodoroCount: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start(state) {
      state.isRunning = true;
    },
    pause(state) {
      state.isRunning = false;
    },
    reset(state, action) {
      state.timeLeft = action.payload;
      state.isRunning = false;
    },
    tick(state, action) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        const settings = action.payload.settings;
        const autoStart = settings.autoStart;
        const longBreakInterval = settings.longBreakInterval;
        const durations = settings.durations;

        // Session completed
        if (state.mode === 'pomodoro') {
          state.pomodoroCount += 1;
          if (state.pomodoroCount % longBreakInterval === 0) {
            state.mode = 'long';
            state.timeLeft = durations.long;
          } else {
            state.mode = 'short';
            state.timeLeft = durations.short;
          }
        } else {
          state.mode = 'pomodoro';
          state.timeLeft = durations.pomodoro;
        }

        // Auto-start next mode if enabled
        state.isRunning = autoStart;
      }
    },
    switchMode(state, action) {
      state.mode = action.payload.mode;
      state.timeLeft = action.payload.duration;
      state.isRunning = false;
    },
    incrementPomodoro(state) {
      state.pomodoroCount++;
    },
    setTimeLeft(state, action) {
      state.timeLeft = action.payload;
    }
  },
});

export const {
  start,
  pause,
  reset,
  tick,
  switchMode,
  incrementPomodoro,
  setTimeLeft,
} = timerSlice.actions;

export default timerSlice.reducer;
