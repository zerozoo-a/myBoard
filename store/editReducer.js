import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  edit: false,
};

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setEdit: (state) => {
      state.edit = !state.edit;
    },
  },
  extraReducers: {},
});
export const { setEdit } = editSlice.actions;
export const selectEdit = (state) => state.edit.edit;
export default editSlice.reducer;
