import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnline: false,
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
  },
});

export const { setOnline, setOffline } = userSlice.actions;
export const selectIsOnline = (state) => state.user.isOnline;
export default userSlice.reducer;
