import { configureStore } from "@reduxjs/toolkit";
import { sideBarSlice } from "../components/slices/sideBarSlice";
import { mainSlice } from "../components/slices/MainSlice";

export const store = configureStore({
      reducer: {
            sideBarSlice: sideBarSlice.reducer,
            mainSlice: mainSlice.reducer
      }
});