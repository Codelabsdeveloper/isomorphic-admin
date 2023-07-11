/*
 * File: Numbers.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:42:26 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import Patterns from '@Utils/Patterns';

/**
 * Function to get last 4 digits - 1111
 * @param {number} number - contains number to format
 * @returns
 */
export const displayLastFourDigits = (number = '') => {
  return number?.slice(-4);
};

/**
 * Function displayMaskedGiftCardNumber
 * @returns
 */
export const displayMaskedGiftCardNumber = (number) => {
  return `xxxx-xxxx-xxxx-${displayLastFourDigits(number)}`;
};

/**
 * Function to format number to (123) 456-7890
 * @param {number} number - contains number to format
 * @returns
 */
export const displayMaskedPhoneNumber = (number) => {
  return number?.replace(Patterns.MASK_PHONE_NUMBER, '($1) $2-$3');
};
