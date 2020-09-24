import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchMentors = createAsyncThunk(
  "mentors/fetchMentors",
  async (_, { dispatch }) => {
    const mentors = await dispatch(sendRequest("matches/mentors", "GET"));
    return mentors;
  },
);

const mentorsSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchMentors.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchMentors.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    // @ts-ignore
    [fetchMentors.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const getMentors = (state) => state.mentors.items;
export const getMentor = (id) => (state) =>
  state.mentors.items.find((item) => item.req_id === id);
export const getMentorState = (state) => state.mentors.status;
const mentorsReducer = mentorsSlice.reducer;
export default mentorsReducer;
