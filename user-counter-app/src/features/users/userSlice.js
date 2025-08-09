import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const savedUsers = JSON.parse(localStorage.getItem('users')) || {
  records: {},
};

const userSlice = createSlice({
  name: 'users',
  initialState: savedUsers,
  reducers: {
    updateUserCount: (state, action) => {
      const { username, count } = action.payload;
      state.records[username] = count;
    },
  },
});

export const { updateUserCount } = userSlice.actions;
export default userSlice.reducer;
