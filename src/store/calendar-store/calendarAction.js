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
// import * as api from '@Configs/endpoints';
import { calSlice } from './calendarSlice';

export const calendarExample = () => async (dispatch) => {
  // console.log('calendarExample');
  let payload = 'sssssssssssssssssssss';
  dispatch(calSlice(payload));
};
