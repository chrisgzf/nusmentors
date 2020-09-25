import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../components/Counter/counterSlice";
import { firebaseReducer } from "react-redux-firebase";
import uiReducer from "../slices/uiSlice";
import requestsReducer from "../slices/requestsSlice";
import userReducer from "../slices/userSlice";
import logger from "redux-logger";
import mentorsReducer from "slices/mentorsSlice";
import menteesReducer from "slices/menteesSlice";
import notificationsReducer from "slices/notificationSlice";
import careersReducer from "slices/careerSlice";

const MY_KEY = "1F90B1515A19E0991F865DBC7669CF41";

export const saveState = (state) => {
  let stringifiedState = JSON.stringify(state);
  localStorage.setItem(MY_KEY, stringifiedState);
};
export const loadState = () => {
  let json = localStorage.getItem(MY_KEY) || "{}";
  let state = JSON.parse(json);

  if (state) {
    return state;
  } else {
    return undefined; // To use the defaults in the reducers
  }
};

export default configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
    ui: uiReducer,
    requests: requestsReducer,
    mentors: mentorsReducer,
    mentees: menteesReducer,
    user: userReducer,
    notifications: notificationsReducer,
    careers: careersReducer,
  },
  preloadedState: loadState(),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});
