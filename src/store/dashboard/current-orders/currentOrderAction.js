/*
 * File: currentOrderAction.js
 * Project: Shoprsmart
 * Created Date: Sat Oct 01 2022 3:24:14 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */
import * as api from '@Configs/endpoints';
import { handleDisplayLoader, handleCurrentOrdersData } from './currentOrderSlice';

export const getCurrentOrdersAction = (orderType) => async (dispatch) => {
  dispatch(handleDisplayLoader(true));
  try {
    const { data } = await api.getOrders(orderType);
    if (data.statusCode === 200) {
      dispatch(handleCurrentOrdersData(data.response.reverse()));
    }
    dispatch(handleDisplayLoader(false));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('file: currentOrderAction.js ~ line 17 ~ getCurrentOrdersAction ~ error', error);
  }
};
