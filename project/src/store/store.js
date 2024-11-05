import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import Course from "./Slices/AddYourCourse";
const store = configureStore({
  reducer: {
    authSlice,
    Course,
  },
});

export default store;
