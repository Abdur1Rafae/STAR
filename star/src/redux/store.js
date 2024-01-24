import {configureStore} from "@reduxjs/toolkit";
import QNavSliceReducer from "./qnavSlice";
import QRTabReducer from "./qrTab";

export default configureStore({
    reducer: {
        showNav: QNavSliceReducer,
        qrTab: QRTabReducer,
    },
})