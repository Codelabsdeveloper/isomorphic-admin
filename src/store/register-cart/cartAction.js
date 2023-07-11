/*
 * File: brandAction.js
 * Project: Shoprsmart
 * Created Date: Wed Sep 21 2022 3:51:06 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */
import * as api from '@Configs/endpoints';
import {
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
  handleUpdateOrderStateReponse,
  handleUpdateOrderStateError,
  updatedCartObject,
  handleRemoveCartItemReponse,
  handleRemoveCartItemError,
  cartNumberSlice,
  campNameSucc,
  campNameErr,
  handleSaveCampignError,
  handleSaveCampignReponse,
  handleSaveCampignReponseReset,
  handleAddAllCartItemsResponse,
  handleAddAllCartItemsError,
} from './cartSlice';

export const clearAddAllResponse = () => async (dispatch) => {
  try {
    dispatch(handleAddAllCartItemsResponse([]));
  } catch (error) {
    dispatch(handleAddAllCartItemsError(error?.message));
  }
};

export const addAllcartDetailsAction = (details) => async (dispatch) => {
  try {
    const { data } = await api.addAllToCartDetails(details);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleAddAllCartItemsResponse(data?.response));
    } else {
      dispatch(handleAddAllCartItemsError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleAddAllCartItemsError(error?.message));
  }
};

export const getLocationViewAction = (request) => async (dispatch) => {
  try {
    const { data } = await api.getLocationView(request);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleLocationViewReponse(data?.response));
    } else {
      dispatch(handleLocationViewError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleLocationViewError(error?.message));
  }
};

/**
 * shd be used to get the cart details in the map view and in display of detials of the added details in cart
 * @param {*} cartId
 * @returns
 */
export const getCartAction = (cartId) => async (dispatch) => {
  try {
    const { data } = await api.getCartDetails(cartId);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleCartReponse(data?.response));
    } else {
      dispatch(handleCartReponse([]));
      dispatch(handleCartError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleCartError(error?.message));
  }
};

/**
 * From the map view while adding to cart
 {
    "cartId": 1,    // if these details are not thr Please dont sent it 
    "retailerSpaceId": 1
  } 
*/
export const cartNumberAction = (details) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('in actions ', details);
  dispatch(cartNumberSlice(details));
};

export const addcartDetailsAction = (details) => async (dispatch) => {
  try {
    const { data } = await api.addCartDetails(details);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleAddCartReponse(data?.response));
    } else {
      dispatch(handleAddCartError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleAddCartError(error?.message));
  }
};

export const postCampaignNameAction = (details) => async (dispatch) => {
  try {
    const { data } = await api.postCampaignName(details);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(campNameSucc(data?.response));
    } else {
      dispatch(campNameErr(data?.response?.message));
    }
  } catch (error) {
    dispatch(campNameErr(error));
  }
};

/**
 * Updaing details in the calander view
 * {
  "id": 1, // item id 
  "scheduleDateStart": 1663325180081,
  "scheduleDateEnd": 1663325180081,
  "cost": 100
}
 */
/**
 * 
 * @param {*} itemId 
 * @param  details 
 *  {
  "id": 1, // item id 
  "scheduleDateStart": 1663325180081, start date
  "scheduleDateEnd": 1663325180081, end date
  "cost": 100 cost
}
 * @returns 
 */
export const updatecartDetailsAction = (itemId, details) => async (dispatch) => {
  try {
    const { data } = await api.updateCartDetails(itemId, details);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleUpdateCartReponse(data?.response));
    } else {
      dispatch(handleUpdateCartError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleUpdateCartError(error?.message));
  }
};

export const updatedCartObjectAction = (obj) => async (dispatch) => {
  dispatch(updatedCartObject(obj));
};

/**
 *
 * @param {*} cartId
 * @param {*} details // send empty object
 * {}
 * @returns
 */
export const confirmCartDetailsAction = (cartId, details) => async (dispatch) => {
  try {
    const { data } = await api.confirmCartDetails(cartId, details);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleConfirmCartReponse(data?.response));
    } else {
      dispatch(handleConfirmCartError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleConfirmCartError(error?.message));
  }
};

export const saveCampignAction = (payload, details) => async (dispatch) => {
  dispatch(handleSaveCampignReponseReset());
  try {
    const { data } = await api.saveCampDetails(payload, details);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleSaveCampignReponse('2000'));
    } else {
      dispatch(handleSaveCampignError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleSaveCampignError(error?.message));
  }
};

// strates :  ORDER_PLACED,CREATE_UPLOADED,PRINTING,INSTALLATION_PROCESS, DONE
export const updateOrderStateAction = (orderId, state) => async (dispatch) => {
  try {
    const { data } = await api.updateOrderState(orderId, state);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleUpdateOrderStateReponse(data?.response));
    } else {
      dispatch(handleUpdateOrderStateError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleUpdateOrderStateError(error?.message));
  }
};

export const removeCartItemAction = (cartId, itemId) => async (dispatch) => {
  try {
    const { data } = await api.removeCartItems(cartId, itemId);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleRemoveCartItemReponse(data?.response));
      dispatch(getCartAction());
    } else {
      dispatch(handleRemoveCartItemError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleRemoveCartItemError(error?.message));
  }
};
