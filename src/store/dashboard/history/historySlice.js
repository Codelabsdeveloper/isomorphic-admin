/*
 * File: dashboardSlice.js
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
  historyOrdersData: [],
};

const historySlice = createSlice({
  name: 'Dashboard History Details',
  initialState,
  reducers: {
    handleDisplayLoader: (state, action) => {
      state.displayLoader = action.payload;
    },
    handleHistoryOrdersData: (state, action) => {
      state.historyOrdersData = action.payload;
    },
  },
});

export const { handleDisplayLoader, handleHistoryOrdersData } = historySlice.actions;
export default historySlice.reducer;
