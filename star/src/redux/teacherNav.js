import {createSlice} from "@reduxjs/toolkit";

export const teacherNav = createSlice({
    name: "teachernav",
    initialState: {
        value: false
    },
    reducers: {
        toggleNavTab: (state) => {
            state.value = !state.value
        }
    }
})

export const {toggleNavTab} = teacherNav.actions
export default teacherNav.reducer