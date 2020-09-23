import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../components/Counter/counterSlice";
import { firebaseReducer } from "react-redux-firebase";
import uiReducer from "../slices/uiSlice";
import requestsReducer from "../slices/requestsSlice";
import userReducer from "../slices/userSlice";
import logger from "redux-logger";
import mentorsReducer from "slices/mentorsSlice";
import menteesReducer from "slices/menteesSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
    ui: uiReducer,
    requests: requestsReducer,
    mentors: mentorsReducer,
    mentees: menteesReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});
