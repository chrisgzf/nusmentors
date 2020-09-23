import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";
import { selectUid } from "utils/firebase";

//TODO: switch back to fetching data
const initialState = {
  items: [
    {
      time_of_request: "2020-09-23T08:44:56.859Z",
      req_id: "r1",
      problem_type: ["resume", "interviews", "general"],
      title: "This is my title",
      description: "This is my description. Thanks for reading.",
      career_type: ["data science"],
      date_created: "2020-09-22T07:24:48.436Z",
      mentor_uid: "2",
      mentor_name: "Bob",
      mentor_photo: null,
      mentor_email: "bob@u.nus.edu",
      mentor_major: "CS",
      mentor_tg: null,
      status: "current",
    },
  ],
  status: "succeeded",
  error: null,
};
export const fetchMentors = createAsyncThunk(
  "mentors/fetchMentors",
  async (_, { dispatch, getState }) => {
    const uid = selectUid(getState());
    const mentors = await dispatch(
      sendRequest("matches/mentors/" + uid, "GET"),
    );
    //TODO: FETCH USING CORRECT ROUTES
    const user = await dispatch(sendRequest("auth/" + uid, "GET"));
    console.log(user);
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
