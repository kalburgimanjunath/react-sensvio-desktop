import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../redux/reducers/contentSlice';

export default configureStore({
  reducer: {
    content: contentReducer,
  },
});
