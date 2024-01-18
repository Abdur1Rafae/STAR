import {configureStore} from "@reduxjs/toolkit";
import QNavSliceReducer from "./qnavSlice";

export default configureStore({
    reducer: {
        showNav: QNavSliceReducer
    },
})