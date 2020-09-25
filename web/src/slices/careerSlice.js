import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCareers = createAsyncThunk(
  "careers/fetchCareers",
  async (_, { dispatch }) => {
    const careers = await dispatch(sendRequest("careers", "GET"));
    return careers;
  },
);

const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchCareers.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchCareers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    // @ts-ignore
    [fetchCareers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const getCareers = (state) => state.careers.items;
export const getCareerState = (state) => state.careers.status;
const careersReducer = careersSlice.reducer;
export default careersReducer;
