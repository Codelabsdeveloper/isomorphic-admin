/*
 * File: loginSlice.js
 * Project: Shoprsmart
 * Created Date: Tue Sep 13 2022 2:51:57 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 8:51:10 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';
import { setToLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';
import { setCookie } from '@Utils/Cookies';

const initialState = {
  // LOGIN VALUES
  loginFormData: {
    email: '',
    phoneNumber: '',
  },
  googleLoginData: {},
  googleLoginError: false,
  loginBtnLoading: false,
  loggedUserDetails: null,
  loginError: '',
  otpBtnLoading: false,
  optResponse: null,
  otpError: '',
};

const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    handleOTPChange: (state, action) => {
      state.otpValues = action.payload;
    },
    handleLoginFormData: (state, action) => {
      state.loginFormData = action.payload;
    },
    handleLoginBtnLoading: (state, action) => {
      state.loginBtnLoading = action.payload;
    },
    handleLoggedUserDetails: (state, action) => {
      state.loggedUserDetails = action.payload;
    },
    handleLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    handleOTPBtnLoading: (state, action) => {
      state.otpBtnLoading = action.payload;
    },
    handleGoogleLoginData: (state, action) => {
      state.googleLoginData = action.payload;
    },
    handleGoogleLoginError: (state, action) => {
      state.googleLoginError = action.payload;
    },
    handleOTPResponse: (state, action) => {
      setCookie(STORAGE.AUTH, JSON.stringify(action.payload));
      setToLocalStorage(STORAGE.AUTH, action.payload);
      state.optResponse = action.payload;
    },
    handleOTPError: (state, action) => {
      state.otpError = action.payload;
    },
    handleLogout: (state) => {
      state.loggedUserDetails = null;
      state.otpError = '';
      state.optResponse = null;
      state.otpBtnLoading = false;
      state.googleLoginData = {};
      state.googleLoginError = false;
      state.loginBtnLoading = false;
      state.loginError = '';
    },
  },
});

export const {
  handleOTPChange,
  handleLoginFormData,
  handleLoginBtnLoading,
  handleLoggedUserDetails,
  handleLoginError,
  handleOTPBtnLoading,
  handleOTPResponse,
  handleGoogleLoginData,
  handleGoogleLoginError,
  handleOTPError,
  handleLogout,
} = loginSlice.actions;
export default loginSlice.reducer;
