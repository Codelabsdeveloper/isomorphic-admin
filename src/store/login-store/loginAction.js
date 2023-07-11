/*
 * File: loginAction.js
 * Project: Shoprsmart
 * Created Date: Thu Sep 15 2022 11:52:34 AM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 5:44:58 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */
import {
  handleLoggedUserDetails,
  handleLoginError,
  handleOTPResponse,
  handleLoginBtnLoading,
  handleOTPBtnLoading,
  handleOTPError,
  handleLogout,
} from './loginSlice';
import { handleBrandReponse } from '@Store/brand-register/brandSlice';
import * as api from '@Configs/endpoints';

export const userLoginAction = (request, router) => async (dispatch) => {
  dispatch(handleLoginError(''));
  dispatch(handleLoginBtnLoading(true));
  try {
    const { data } = await api.generateOtp(request);
    if (data?.statusCode === 200 && data?.response?.id) {
      const userData = data.response;
      dispatch(handleLoggedUserDetails(userData));
      const { message, id } = userData;
      if (message === 'OTP Generated successfully' && id) {
        router.push(`/otp?id=${id}`);
      }
    } else {
      dispatch(handleLoginError(data?.response?.message));
    }
    dispatch(handleLoginBtnLoading(false));
  } catch (error) {
    dispatch(handleLoginBtnLoading(false));
  }
};

export const validateOtpAction = (request) => async (dispatch) => {
  dispatch(handleOTPBtnLoading(true));
  dispatch(handleOTPError(''));
  try {
    const { data } = await api.validateOtp(request);
    if (data?.statusCode === 200 && data?.response) {
      const userData = data.response;
      dispatch(handleOTPResponse(userData));
      if (userData.isBrandDetailsAvailable && Object.keys(userData.brandDetails).length > 0) {
        dispatch(handleBrandReponse(userData.brandDetails));
      }
    } else {
      dispatch(handleOTPError(data?.response?.message));
    }
    dispatch(handleOTPBtnLoading(false));
  } catch (error) {
    dispatch(handleOTPBtnLoading(false));
  }
};

export const handleLogoutAction = () => async (dispatch) => {
  dispatch(handleLogout());
};
