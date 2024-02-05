import {createSlice} from "@reduxjs/toolkit";

export const qrTab = createSlice({
    name: "qrtab",
    initialState: {
        value: true
    },
    reducers: {
        toggleTab: (state) => {
            state.value = !state.value
        }
    }
})

export const {toggleTab} = qrTab.actions
export default qrTab.reducer