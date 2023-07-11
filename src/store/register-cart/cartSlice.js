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
  locationDetails: [],
  locationDetailsError: null,
  getCartDetails: {},
  getCartDetailsError: null,
  addCartDetails: {},
  addCartDetailsError: null,
  updateCartDetails: {},
  updateCartDetailsError: null,
  confirmCartDetails: {},
  confirmCartDetailsError: null,
  orderStatusDetails: {},
  orderStatusError: null,
  removeCartItemSuccess: null,
  removeCartItemError: null,
  addAllCartResponse: [],
  addAllCartError: null,
};

const cartSlice = createSlice({
  name: 'Cart Details',
  initialState,
  reducers: {
    handleLocationViewReponse: (state, action) => {
      state.locationDetails = action.payload;
    },
    handleLocationViewError: (state, action) => {
      state.locationDetailsError = action.payload;
    },
    handleCartReponse: (state, action) => {
      state.getCartDetails = action.payload;
    },
    handleCartError: (state, action) => {
      state.getCartDetailsError = action.payload;
    },
    handleAddCartReponse: (state, action) => {
      state.addCartDetails = action.payload;
      state.getCartDetails = action.payload;
    },
    handleAddCartError: (state, action) => {
      state.addCartDetailsError = action.payload;
    },
    handleUpdateCartReponse: (state, action) => {
      state.updateCartDetails = action.payload;
    },
    handleUpdateCartError: (state, action) => {
      state.updateCartDetailsError = action.payload;
    },
    handleConfirmCartReponse: (state, action) => {
      state.confirmCartDetails = action.payload;
    },
    handleConfirmCartError: (state, action) => {
      state.confirmCartDetailsError = action.payload;
    },
    handleSaveCampignReponseReset: (state) => {
      state.saveCampaignDetails = '';
    },
    handleSaveCampignReponse: (state, action) => {
      state.saveCampaignDetails = action.payload;
    },
    handleSaveCampignError: (state, action) => {
      state.saveCampaignDetailsErr = action.payload;
    },
    handleUpdateOrderStateReponse: (state, action) => {
      state.orderStatusDetails = action.payload;
    },
    handleUpdateOrderStateError: (state, action) => {
      state.orderStatusError = action.payload;
    },

    updatedCartObject: (state, action) => {
      state.updatedCalCartObj = action.payload;
    },
    handleRemoveCartItemReponse: (state, action) => {
      state.removeCartItemSuccess = action.payload;
    },
    handleRemoveCartItemError: (state, action) => {
      state.removeCartItemError = action.payload;
    },
    cartNumberSlice: (state, action) => {
      state.cartNumberReducer = action.payload;
    },
    campNameSucc: (state, action) => {
      state.campaignNameSucc = action.payload;
    },
    campNameErr: (state, action) => {
      state.campaignNameErr = action.payload;
    },
    handleAddAllCartItemsResponse: (state, action) => {
      state.addAllCartResponse = action.payload;
    },
    handleAddAllCartItemsError: (state, action) => {
      state.addAllCartError = action.payload;
    },
  },
});

export const {
  handleLocationViewReponse,
  handleLocationViewError,
  handleCartReponse,
  handleCartError,
  handleAddCartReponse,
  handleAddCartError,
  handleUpdateCartReponse,
  handleUpdateCartError,
  handleConfirmCartReponse,
  handleConfirmCartError,
  handleSaveCampignReponse,
  handleSaveCampignReponseReset,
  handleSaveCampignError,
  handleUpdateOrderStateReponse,
  handleUpdateOrderStateError,
  updatedCartObject,
  handleRemoveCartItemReponse,
  handleRemoveCartItemError,
  cartNumberSlice,
  campNameSucc,
  campNameErr,
  handleAddAllCartItemsResponse,
  handleAddAllCartItemsError,
} = cartSlice.actions;
export default cartSlice.reducer;
