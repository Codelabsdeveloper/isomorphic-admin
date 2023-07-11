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
import { handleDisplayLoader, handleHistoryOrdersData } from './historySlice';
import { message } from 'antd';

export const getHistoryOrdersAction = (orderType) => async (dispatch) => {
  try {
    const { data } = await api.getOrders(orderType);
    if (data.statusCode === 200) {
      dispatch(handleHistoryOrdersData(data.response.reverse()));
    }
    dispatch(handleDisplayLoader(false));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('file: currentOrderAction.js ~ line 17 ~ getCurrentOrdersAction ~ error', error);
  }
};

export const downloadInvoiceAction = (orderId) => async () => {
  try {
    const { data } = await api.downloadInvoice(orderId);
    if (data?.statusCode === 200 && data?.response) {
      window.open(data?.response, '_self');
    } else {
      message.error('Please try again later.');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('file: historyAction.js ~ line 31 ~ downloadInvoiceAction ~ error', error);
    message.error('Please try again later.');
  }
};
