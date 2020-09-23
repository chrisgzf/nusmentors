import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
import { selectUid } from "utils/firebase";
//TODO: switch back to fetching data
const initialState = {
  items: [
    {
      time_of_request: "2020-09-23T08:16:13.775Z",
      req_id: "r1",
      problem_type: ["resume", "interviews", "general"],
      title: "This is my title",
      description: "This is my description. Thanks for reading.",
      career_type: ["data science"],
      date_created: "2020-09-22T07:24:48.436Z",
      mentee_uid: "1",
      mentee_name: "Alice",
      mentee_photo: null,
      mentee_email: "alice@u.nus.edu",
      mentee_major: "CS",
      mentee_tg: null,
      status: "current",
    },
    {
      time_of_request: "2020-09-23T08:16:13.775Z",
      req_id: "r2",
      problem_type: ["resume"],
      title: "Improving resume",
      description:
        "Please help me to look through my resume and suggest improvements!",
      career_type: ["native dev"],
      date_created: "2020-09-22T07:24:48.438Z",
      mentee_uid: "3",
      mentee_name: "Charlie",
      mentee_photo: null,
      mentee_email: "charlie@u.nus.edu",
      mentee_major: "CS",
      mentee_tg: null,
      status: "current",
    },
  ],
  status: "succeeded",
  error: null,
};
export const fetchMentees = createAsyncThunk(
  "mentees/fetchMentees",
  async (_, { dispatch, getState }) => {
    const uid = selectUid(getState());
    const mentees = await dispatch(
      sendRequest("matches/mentees/" + uid, "GET"),
    );
    //TODO: FETCH USING CORRECT ROUTES
    return mentees;
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
  state.mentees.items.find((item) => item.req_id === id);
export const getMenteeState = (state) => state.mentees.status;
const menteesReducer = menteesSlice.reducer;
export default menteesReducer;
