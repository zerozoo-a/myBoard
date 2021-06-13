import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../myBase';

export const isUserSignUpSuccess = createAsyncThunk(
  'user/userSignUpState',
  async (data) => {
    let response = await authService.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    // console.log('response', response.user.additionalUserInfo.isNewUser);
    response = response.user.email;
    return response;
  }
);
