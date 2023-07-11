/*
 * File: protectedSlice.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 18 2022 8:51:22 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';

const initialState = {
  isProtectedPage: false,
};

const protectedSlice = createSlice({
  name: 'PROTECTED_PAGES',
  initialState,
  reducers: {
    handleProctedPage: (state) => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line max-len
        if (
          getFromLocalStorage(STORAGE.AUTH) &&
          Object?.keys(getFromLocalStorage(STORAGE.AUTH))?.length
        ) {
          state.isProtectedPage = true;
        }
      }
    },
  },
});

export const { handleProctedPage } = protectedSlice.actions;
export default protectedSlice.reducer;
