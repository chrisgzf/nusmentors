import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
  snackbar: {
    open: false,
    type: "",
    message: "",
  },
  app: {
    isOnline: true,
    wasOffline: false,
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
    appOnline(state) {
      state.app.isOnline = true;
    },
    appOffline(state) {
      state.app.isOnline = false;
      state.app.wasOffline = true;
    },
    appRestored(state) {
      state.app.wasOffline = false;
    },
  },
});

export const {
  closeDrawer,
  openDrawer,
  showSnackbar,
  clearSnackbar,
  appOffline,
  appOnline,
  appRestored,
} = uiSlice.actions;

// Selectors
export const selectSnackbar = (state) => state.ui.snackbar;
export const selectAppIsOnline = (state) => state.ui.app.isOnline;
export const selectAppWasOffline = (state) => state.ui.app.wasOffline;

export default uiSlice.reducer;
