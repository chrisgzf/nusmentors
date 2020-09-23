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
    return requests;
  },
);

export const acceptRequest = createAsyncThunk(
  "requests/acceptRequest",
  async (requestId, { getState, dispatch }) => {
    const uid = selectUid(getState());
    const requests = await dispatch(
      sendRequest(`reqs/${requestId}/${uid}`, "PUT"),
    );
    return requests;
  },
);

export const addRequest = createAsyncThunk(
  "requests/addRequest",
  async (data, { dispatch }) => {
    const requests = await dispatch(sendRequest("reqs", "POST", data));
    return requests;
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
    [addRequest.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

// Selectors
export const getRequests = (state) => state.requests.items;
export const getRequestState = (state) => state.requests.status;

export default requestsSlice.reducer;
