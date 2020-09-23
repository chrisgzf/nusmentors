import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
//TODO: switch back to fetching data
const initialState = {
  items: [
    {
      name: "Bob",
      to_id: "1",
      notif_type: "accept",
      date_created: "2020-09-23T07:15:41.834Z",
    },
  ],
  status: "succeeded",
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { dispatch, getState }) => {
    const notifications = await dispatch(sendRequest("notifs", "GET"));
    return notifications;
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
    },
  },
});

// Selectors
export const getNotifications = (state) => state.notifications.items;
export const getNotificationState = (state) => state.notifications.status;
const notificationsReducer = notificationsSlice.reducer;
export default notificationsReducer;
