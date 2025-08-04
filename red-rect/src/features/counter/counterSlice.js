import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    countss: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
            state.countss += 1
            console.log(`count ${state.countss}`)
        },
        decrement: (state) => {
            state.value -= 1;
            console.log(state.value)
        },
        reset: (state) => {
            state.value = 0;
            console.log(state.value)
        }
    }
})

export const {increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;