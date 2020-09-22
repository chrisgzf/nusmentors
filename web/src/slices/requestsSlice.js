import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
import { selectUid } from "utils/firebase";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};
export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (_, { dispatch }) => {
    const requests = await dispatch(sendRequest("reqs", "GET"));
    return requests.json();
  },
);

export const acceptRequest = createAsyncThunk(
  "requests/acceptRequest",
  async (requestId, { getState, dispatch }) => {
    const uid = selectUid(getState());
    const requests = await dispatch(
      sendRequest(`reqs/${requestId}/${uid}`, "PUT"),
    );
    return requests.json();
  },
);
export const addRequest = createAsyncThunk(
  "requests/addRequest",
  async (data, { dispatch }) => {
    const requests = await dispatch(sendRequest("reqs", "POST", data));
    return requests.json();
  },
);

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRequests.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    [fetchRequests.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addRequest.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

// Selectors
export const getRequests = (state) => state.requests.items;
export const getRequestState = (state) => state.requests.status;

export default requestsSlice.reducer;
