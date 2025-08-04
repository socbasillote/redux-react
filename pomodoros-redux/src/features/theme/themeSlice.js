import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage } from '../../utils/localStorage';

const initialState = {
  colors: {
    pomodoro: '#d95550',
    short: '#4c9195',
    long: '#457ca3',
  },
  currentColor: '#d95550', // default: pomodoro
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColor(state, action) {
      const mode = action.payload;
      state.currentColor = state.colors[mode] || '#d95550';
    },
    setColorForMode(state, action) {
      const { mode, color } = action.payload;
      state.colors[mode] = color;
      saveToLocalStorage('theme', state);
    },
  },
});

export const { setThemeColor, setColorForMode } = themeSlice.actions;
export default themeSlice.reducer;
