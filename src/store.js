import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import bjReducer from './reducers/bjReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    bjReducer: bjReducer,
  },
});
