import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
  snackbar: {
    open: false,
    type: "",
    message: "",
  },
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
    showSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.type = action.payload.type;
      state.snackbar.message = action.payload.message;
    },
    clearSnackbar(state) {
      state.snackbar.open = false;
      state.snackbar.type = "";
      state.snackbar.message = "";
    },
  },
});

export const {
  closeDrawer,
  openDrawer,
  showSnackbar,
  clearSnackbar,
} = uiSlice.actions;

// Selectors
export const selectSnackbar = (state) => state.ui.snackbar;

export default uiSlice.reducer;
