import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/Counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
