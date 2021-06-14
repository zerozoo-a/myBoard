import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import imageReducer from './imageReducer';
import editReducer from './editReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    edit: editReducer,
  },
});
