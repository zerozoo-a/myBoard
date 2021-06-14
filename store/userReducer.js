import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isOnline: false,
  mode: 'dark',
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOnline: (state) => {
      state.isOnline = true;
    },
    setOffline: (state) => {
      state.isOnline = false;
    },
    setDarkMode: (state) => {
      state.mode = 'dark';
    },
    setLightMode: (state) => {
      state.mode = 'light';
    },
  },
  extraReducers: {
    // [isUserSignUpSuccess.pending]: (state) => {},
    // [isUserSignUpSuccess.fulfilled]: (state) => {
    //   state.isOnline = true;
    // },
    // [isUserSignUpSuccess.rejected]: (state) => {},
  },
});

export const { setOnline, setOffline, setDarkMode, setLightMode } =
  userSlice.actions;
export const selectIsOnline = (state) => state.user.isOnline;
export const selectMode = (state) => state.user.mode;
export default userSlice.reducer;
