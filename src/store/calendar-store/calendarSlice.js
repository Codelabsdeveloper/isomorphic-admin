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
};

const calendarSlice = createSlice({
  name: 'Brand Details',
  initialState,
  reducers: {
    calSlice: (state, action) => {
      // console.log('sliceeeeeeeee',action.payload);
      state.calSliceValue = action.payload;
    },
  },
});

export const { calSlice } = calendarSlice.actions;
export default calendarSlice.reducer;
