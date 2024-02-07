import {configureStore} from "@reduxjs/toolkit";
import QNavSliceReducer from "./qnavSlice";
import QRTabReducer from "./qrTab";
import TeacherNavReducer from "./teacherNav";

export default configureStore({
    reducer: {
        showNav: QNavSliceReducer,
        qrTab: QRTabReducer,
        teacherNav: TeacherNavReducer
    },
})