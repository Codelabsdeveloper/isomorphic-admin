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
import { STORAGE } from '@Constants/constants';
import { getFromLocalStorage, setToLocalStorage } from '@Utils/StorageUtil';
import {
  handleBrandReponse,
  handleBrandError,
  handleAudienceGoalsResponse,
  handleAudienceGoalsError,
  handleThankyouLogoutLoading,
  handleThankyouLogoutResponse,
  handleThankyouLogoutError,
} from './brandSlice';
import { message } from 'antd';

export const thankyouLogout = () => async (dispatch) => {
  try {
    dispatch(handleThankyouLogoutLoading(true));

    const { data } = await api.thankyouLogoutApi();
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleThankyouLogoutResponse(data?.response));
      dispatch(handleThankyouLogoutLoading(false));
    } else {
      dispatch(handleBrandError(data?.response?.message));
      dispatch(handleThankyouLogoutLoading(false));
    }
  } catch (error) {
    dispatch(handleThankyouLogoutError(error?.message));
    dispatch(handleThankyouLogoutLoading(false));
  }
};

export const registerBrandAction = (request) => async (dispatch) => {
  try {
    const { data } = await api.registerBrand(request);
    if (data?.statusCode === 200 && data?.response) {
      let userData = getFromLocalStorage(STORAGE.AUTH);
      let dt = data.response;
      userData.accessToken = dt.accessToken;
      delete dt.accessToken;
      const newObj = { ...userData, brandDetails: dt };
      setToLocalStorage(STORAGE.AUTH, newObj);
      dispatch(handleBrandReponse(data?.response));
      // router.push('/register-brand/thank-you');
    } else {
      dispatch(handleBrandError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleBrandError(error?.message));
  }
};

export const loadBrandDetailsAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.loadBrandDetails(userId);
    if (data?.statusCode === 200 && data?.response?.id) {
      dispatch(handleBrandReponse(data?.response));
    } else {
      dispatch(handleBrandError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleBrandError(error?.message));
  }
};

export const registerAudienceGoals = (request) => async (dispatch) => {
  try {
    const { payload, brandId } = request || {};
    const { data } = await api.updateBrandDetails(payload, brandId);
    if (data?.statusCode === 200 && data?.response) {
      dispatch(handleAudienceGoalsResponse(data?.response));
      // router.push('/register-brand/thank-you');
    } else {
      dispatch(handleAudienceGoalsError(data?.response?.message));
    }
  } catch (error) {
    dispatch(handleAudienceGoalsError(error?.message));
  }
};

export const updateBrandDetailsAction = (request, brandId) => async () => {
  try {
    const { data } = await api.updateBrandDetails(request, brandId);
    if (data?.response) {
      message.success('Update Successfull');
      const userData = getFromLocalStorage(STORAGE.AUTH);
      delete data?.response?.accessToken;
      const newObj = { ...userData, brandDetails: data?.response };
      setToLocalStorage(STORAGE.AUTH, newObj);
    } else message.error('Error occured');
  } catch (error) {
    message.error('Error occured');
  }
};
