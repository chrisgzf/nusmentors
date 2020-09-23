import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";

const initialState = {
  name: "",
  email: "",
  nusEmail: "",
  matricDate: "",
  gradDate: "",
  major: "",
  photoUrl: "",
  telegram: "",
  status: "",
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { dispatch }) => {
    const userInfo = await dispatch(sendRequest("auth/info", "GET"));
    return userInfo;
  },
);

export const postUserInfo = createAsyncThunk(
  "user/postUserInfo",
  async (data, { dispatch }) => {
    const response = await dispatch(sendRequest("auth", "POST", data));
    return data;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserInfo.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = "succeeded";
      state = { ...action.payload, ...state };
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postUserInfo.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state = { ...action.payload, ...state };
    },
  },
});

// Selectors
export const selectUser = (state) => state.user;
export const selectName = (state) => state.user.name;
export const selectNUSEmail = (state) => state.user.nusEmail;
export const selectPhotoURL = (state) => state.user.photoUrl;
export const selectMatricDate = (state) => state.user.matricDate;
export const selectGradDate = (state) => state.user.gradDate;
export const selectMajor = (state) => state.user.major;
export const selectTelegram = (state) => state.user.telegram;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
