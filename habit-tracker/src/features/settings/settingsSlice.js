import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    showCompleted: true,
    backgroundColor: 'bg-white',
  },
  reducers: {
    toggleShowCompleted: state => {
      state.showCompleted = !state.showCompleted
    },
    changeBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload
    },
  },
})

export const { toggleShowCompleted, changeBackgroundColor } = settingsSlice.actions
export default settingsSlice.reducer
