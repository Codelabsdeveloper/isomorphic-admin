/*
 * File: creativeWorkSlice.js
 * Project: Shoprsmart
 * Created Date: Sat Oct 06 2022 3:20:24 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pdfFileList: [],
  jpgFileList: [],
  pngFileList: [],
  isUploadModalOpen: false,
  currentOrderForUpload: {},
};

const creativeWorkSlice = createSlice({
  name: 'Dashboard Creative Work Details',
  initialState,
  reducers: {
    handlePDFFileList: (state, action) => {
      state.pdfFileList = action.payload;
    },
    handleJPGFileList: (state, action) => {
      state.jpgFileList = action.payload;
    },
    handlePNGFileList: (state, action) => {
      state.pngFileList = action.payload;
    },
    handleIsUploadModalOpen: (state, action) => {
      state.isUploadModalOpen = action.payload;
    },
    handleCurrentOrderForUpload: (state, action) => {
      state.currentOrderForUpload = action.payload;
    },
  },
});

export const {
  handlePDFFileList,
  handleJPGFileList,
  handlePNGFileList,
  handleIsUploadModalOpen,
  handleCurrentOrderForUpload,
} = creativeWorkSlice.actions;
export default creativeWorkSlice.reducer;
