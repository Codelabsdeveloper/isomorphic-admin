/*
 * File: currentOrderSlice.js
 * Project: Shoprsmart
 * Created Date: Sat Oct 01 2022 3:20:24 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayLoader: true,
  currentOrdersData: [],
};

const currentOrderSlice = createSlice({
  name: 'Dashboard Current Orders Details',
  initialState,
  reducers: {
    handleDisplayLoader: (state, action) => {
      state.displayLoader = action.payload;
    },
    handleCurrentOrdersData: (state, action) => {
      state.currentOrdersData = action.payload;
    },
  },
});

export const { handleDisplayLoader, handleCurrentOrdersData } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
