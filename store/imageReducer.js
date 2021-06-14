import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  URL: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setURL: (state, action) => {
      state.URL = action.payload;
    },
  },
  extraReducers: {},
});

export const { setURL } = imageSlice.actions;
export const selectURL = (state) => state.image.URL;
export default imageSlice.reducer;
