import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../components/Counter/counterSlice";
import { firebaseReducer } from "react-redux-firebase";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});
