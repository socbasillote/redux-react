import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage } from '../../utils/localStorage';

const initialState = {
  durations: {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  },
  longBreakInterval: 4, // After 4 pomodoros → long break
  autoStart: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPomodoroDuration(state, action) {
      state.durations.pomodoro = action.payload;
      saveToLocalStorage('settings', state);
    },
    setShortBreakDuration(state, action) {
      state.durations.short = action.payload;
      saveToLocalStorage('settings', state);
    },
    setLongBreakDuration(state, action) {
      state.durations.long = action.payload;
      saveToLocalStorage('settings', state);
    },
    setLongBreakInterval(state, action) {
      state.longBreakInterval = action.payload;
      saveToLocalStorage('settings', state);
    },
    setAutoStart(state, action) {
      state.autoStart = action.payload;
      saveToLocalStorage('settings', state);
    }
  },
});

export const {
  setPomodoroDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setLongBreakInterval,
  setAutoStart,
} = settingsSlice.actions;

export const selectDurations = (state) => state.settings.durations;
export const selectLongBreakInterval = (state) => state.settings.longBreakInterval;
export const selectAutoStart = (state) => state.settings.autoStart;

export default settingsSlice.reducer;
