import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./testSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    testSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
