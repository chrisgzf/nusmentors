import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
const initialState = {
  items: [],
  status: "idle",
  error: null,
};
export const fetchMentees = createAsyncThunk(
  "mentees/fetchMentees",
  async (_, { dispatch, getState }) => {
    const mentees = await dispatch(sendRequest("matches/mentees", "GET"));
    return mentees;
  },
);
export const dropMentee = createAsyncThunk(
  "mentees/dropMentee",
  async (requestId, { dispatch, getState }) => {
    await dispatch(sendRequest(`matches/${requestId}`, "DELETE"));
    await dispatch(fetchMentees());
  },
);
export const completeMentee = createAsyncThunk(
  "mentees/completeMentee",
  async (requestId, { dispatch }) => {
    await dispatch(sendRequest(`matches/${requestId}`, "PUT"));
    await dispatch(fetchMentees());
  },
);

const menteesSlice = createSlice({
  name: "mentees",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchMentees.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchMentees.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    // @ts-ignore
    [fetchMentees.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const getMentees = (state) => state.mentees.items;
export const getMentee = (id) => (state) =>
  state.mentees.items.find((item) => item.req_id === +id);
export const getMenteeState = (state) => state.mentees.status;
const menteesReducer = menteesSlice.reducer;
export default menteesReducer;
