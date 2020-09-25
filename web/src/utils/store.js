import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer, createTransform } from "redux-persist";
const SetTransform = createTransform(
  (inboundState, key) => {
    // convert mySet to an Array.
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    return { ...outboundState, status: "idle" };
  },
  // define which reducers this transform gets called for.
  { blacklist: ["ui", "firebase"] },
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [SetTransform],
};

const reducer = combineReducers({
  counter: counterReducer,
  firebase: firebaseReducer,
  ui: uiReducer,
  requests: requestsReducer,
  mentors: mentorsReducer,
  mentees: menteesReducer,
  user: userReducer,
  notifications: notificationsReducer,
  careers: careersReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
