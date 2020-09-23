import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";

const initialState = {
  items: {
    name: "",
    email: "",
    nusEmail: "",
    matricDate: "",
    gradDate: "",
    major: "",
    photoUrl: "",
    telegram: "",
  },
  status: "",
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { dispatch }) => {
    const userInfo = await dispatch(sendRequest("auth/info", "GET"));
    const {
      email,
      grad_date,
      major,
      matric_date,
      name,
      nus_email,
      photo_url,
      telegram,
    } = userInfo;
    const transformed = {
      email,
      gradDate: grad_date,
      major,
      matricDate: matric_date,
      name,
      nusEmail: nus_email,
      photoUrl: photo_url,
      telegram,
    };
    return transformed;
  },
);

export const postUserInfo = createAsyncThunk(
  "user/postUserInfo",
  async (data, { dispatch }) => {
    const response = await dispatch(sendRequest("auth", "POST", data));
    const {
      email,
      graduate_in,
      major,
      matric_date,
      name,
      nus_email,
      photo_url,
      tg_handle,
    } = data;
    const transformed = {
      email,
      gradDate: graduate_in,
      major,
      matricDate: matric_date,
      name,
      nusEmail: nus_email,
      photoUrl: photo_url,
      telegram: tg_handle,
    };
    return transformed;
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
      state.status = "succeeded";
      state.items = action.payload;
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postUserInfo.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [postUserInfo.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
  },
});

// Selectors
export const selectUser = (state) => state.user;
export const selectName = (state) => state.user.items.name;
export const selectNUSEmail = (state) => state.user.items.nusEmail;
export const selectPhotoURL = (state) => state.user.items.photoUrl;
export const selectMatricDate = (state) => state.user.items.matricDate;
export const selectGradDate = (state) => state.user.items.gradDate;
export const selectMajor = (state) => state.user.items.major;
export const selectTelegram = (state) => state.user.items.telegram;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
