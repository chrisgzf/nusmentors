import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "utils/backend";

const initialState = {
  name: "",
  nus_email: "",
  photo_url: "",
  matric_date: "",
  grad_date: "",
  major: "",
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state = { ...action.payload, ...state };
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const selectUser = (state) => state.user;
export const selectName = (state) => state.user.name;
export const selectNUSEmail = (state) => state.user.nus_email;
export const selectPhotoURL = (state) => state.user.photo_url;
export const selectMatricDate = (state) => state.user.matric_date;
export const selectGradDate = (state) => state.user.grad_date;
export const selectMajor = (state) => state.user.major;
export const selectTelegram = (state) => state.user.telegram;

export default userSlice.reducer;
