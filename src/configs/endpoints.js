/*
 * File: endpoints.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 1:42:39 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import getEnv from '@Utils/Env';
import axios from 'axios';
import { STORAGE } from '@Constants/constants';
import { getFromLocalStorage } from '@Utils/StorageUtil';

// Read it from env else fallback to prodution
let baseURI = getEnv('ATG_API_BASE_URI');

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  baseURI = '/proxy-api/rest';
}

// TO CHANGE LATER
baseURI = process.env.NEXT_PUBLIC_BASE_URI;

const API = axios.create({
  baseURL: baseURI,
});

API.interceptors.request.use((req) => {
  const userData = getFromLocalStorage(STORAGE.AUTH);
  if (!userData) return req;
  if (userData.accessToken) {
    req.headers['x-access-token'] = userData.accessToken;
  }
  return req;
});

const unInterceptedAPI = axios.create({
  baseURL: baseURI,
});

// LOGIN
export const generateOtp = (formData) => unInterceptedAPI.post('/login/generate-otp', formData);
export const validateOtp = (formData) => unInterceptedAPI.post('/login/validate-otp', formData);

// BRAND
export const registerBrand = (formData) => API.post('/shopr-user/brand-details', formData);
export const updateBrandDetails = (payload, brandId) =>
  API.put(`/shopr-user/brand-details/${brandId}`, payload);
export const loadBrandDetails = () => API.get('/shopr-user/brand-details');

// LOCATION VIEW
export const getLocationView = () => API.post('/location-views', {});

// CART
export const getCartDetails = (cartId) => API.get(cartId ? `/carts?cartId=${cartId}` : '/carts');
export const addCartDetails = (data) => API.post('/carts/add-item', data);
export const addAllToCartDetails = (data) => API.post('/carts/add-all-item', data);
export const confirmCartDetails = (cartId, data) =>
  API.post(`/carts/confirm-cart?cartid=${cartId}`, data);
export const saveCampDetails = (
  payload
  // data
) => API.put(`/carts/${payload.cartId}`, { isFavourite: payload.isFavourite });

export const updateCartDetails = (itemId, data) =>
  API.post(`/carts/update-item?itemid=${itemId}`, data);
export const updateOrderState = (orderId, state) => API.put(`/carts/${orderId}/${state}`, {});
export const getAllOrders = () => API.get('/carts/orders');

export const postCampaignName = (data) => API.post('/carts/order-campaign', data);

// DASHBOARD - CREATIVE WORK
export const postUploadCreativeWork = (formData, imageTypeId, orderId) =>
  API.post(`/images/upload?imageTypeId=${imageTypeId}&orderId=${orderId}`, formData);
export const putCreativeWorkFilePaths = (formData, orderId) =>
  API.put(`/dashboard/creative-work/${orderId}`, formData);

// DASHBOARD - ORDERS
export const getOrders = (orderType) =>
  API.get(orderType ? `/reports/orders?orderType=${orderType}` : '/reports/orders');

export const downloadInvoice = (orderId) =>
  API.get(`/dashboard/download-invoice?orderId=${orderId}`);

export const removeCartItems = (cartId, itemId) =>
  API.put(`/carts/remove-cart-item?itemid=${itemId}&cartid=${cartId}`, {});

export const thankyouLogoutApi = () => API.post('/shopr-user/brand-details/thank-you');
