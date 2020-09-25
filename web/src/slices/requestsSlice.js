import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
import { fetchMentees } from "./menteesSlice";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};
export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (_, { dispatch }) => {
    const requests = await dispatch(sendRequest("reqs", "GET"));
    return requests;
  },
);

export const acceptRequest = createAsyncThunk(
  "requests/acceptRequest",
  async (requestId, { dispatch }) => {
    await dispatch(sendRequest(`reqs/${requestId}/accept`, "PUT"));
    await dispatch(fetchMentees);
    return requestId;
  },
);

export const addRequest = createAsyncThunk(
  "requests/addRequest",
  async (data, { dispatch }) => {
    await dispatch(sendRequest("reqs", "POST", data));
    await dispatch(fetchRequests);
  },
);

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchRequests.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    // @ts-ignore
    [fetchRequests.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // @ts-ignore
    [acceptRequest.fulfilled]: (state, action) => {
      const request = state.items.find(
        (item) => item.req_id === action.payload,
      );
      if (request) {
        request.to_display = false;
      }
    },
  },
});

// Selectors
export const getRequests = (state) => state.requests.items;
export const getRequestState = (state) => state.requests.status;

export default requestsSlice.reducer;
