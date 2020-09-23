import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeDrawer(state) {
      state.isDrawerOpen = false;
    },
    openDrawer(state) {
      state.isDrawerOpen = true;
    },
  },
});

export const { closeDrawer, openDrawer } = uiSlice.actions;

export default uiSlice.reducer;
