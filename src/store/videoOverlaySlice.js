/*
 * File: videoOverlaySlice.js
 * Project: Shoprsmart
 * Created Date: Mon Sep 12 2022 2:30:07 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVideoOverlayOpen: true,
};

const videoOverlaySlice = createSlice({
  name: 'Video Overlay',
  initialState,
  reducers: {
    changeOverlayState: (state, action) => {
      state.isVideoOverlayOpen = action.payload;
    },
  },
});

export const { changeOverlayState } = videoOverlaySlice.actions;
export default videoOverlaySlice.reducer;
