/*
 * File: brandSlice.js
 * Project: Shoprsmart
 * Created Date: Wed Sep 21 2022 3:05:13 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerBrandDetails: {},
  brandReponse: {},
  brandError: false,
  audienceGoalsResponse: {},
  audienceGoalsError: {},
  thankYouLogoutLoading: false,
  thankYouLogoutResponse: {},
  thankYouLogoutError: null,
};

const brandSlice = createSlice({
  name: 'Brand Details',
  initialState,
  reducers: {
    handleRegisterBrand: (state, action) => {
      state.registerBrandDetails = action.payload;
    },
    handleBrandReponse: (state, action) => {
      state.brandRegisterReponse = action.payload;
    },
    handleBrandError: (state, action) => {
      state.brandRegisterError = action.payload;
    },
    handleAudienceGoalsResponse: (state, action) => {
      state.audienceGoalsResponse = action.payload;
    },
    handleAudienceGoalsError: (state, action) => {
      state.audienceGoalsError = action.payload;
    },
    handleThankyouLogoutLoading: (state, action) => {
      state.thankYouLogoutLoading = action.payload;
    },
    handleThankyouLogoutResponse: (state, action) => {
      state.thankYouLogoutResponse = action.payload;
    },
    handleThankyouLogoutError: (state, action) => {
      state.thankYouLogoutError = action.payload;
    },
  },
});

export const {
  handleRegisterBrand,
  handleBrandReponse,
  handleBrandError,
  handleAudienceGoalsResponse,
  handleAudienceGoalsError,
  handleThankyouLogoutLoading,
  handleThankyouLogoutResponse,
  handleThankyouLogoutError,
} = brandSlice.actions;
export default brandSlice.reducer;
