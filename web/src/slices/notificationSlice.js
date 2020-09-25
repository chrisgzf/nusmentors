import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
//TODO: switch back to fetching data
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { dispatch }) => {
    const notifications = await dispatch(sendRequest("notifs", "GET"));
    return notifications;
  },
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { dispatch }) => {
    await dispatch(sendRequest("notifs", "PUT", { nid: notificationId }));
    return notificationId;
  },
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchNotifications.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    // @ts-ignore
    [fetchNotifications.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }, // @ts-ignore
    [markNotificationAsRead.fulfilled]: (state, action) => {
      state.items.find((item) => item.nid === action.payload).is_read = true;
    },
  },
});

// Selectors
export const getNotifications = (state) => state.notifications.items;
export const getNotificationState = (state) => state.notifications.status;
const notificationsReducer = notificationsSlice.reducer;
export default notificationsReducer;
