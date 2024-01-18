import {createSlice} from "@reduxjs/toolkit";

export const qnavSlice = createSlice({
    name: "qnav",
    initialState: {
        value: false
    },
    reducers: {
        toggleNav: (state) => {
            state.value = !state.value
        }
    }
})

export const {toggleNav} = qnavSlice.actions
export default qnavSlice.reducer