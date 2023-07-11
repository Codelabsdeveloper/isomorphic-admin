/*
 * File: Types.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:42:56 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

/**
 * @memberOf Utils.Types
 * @type {function}
 * @param {*} value
 * @param {string} type
 * @return {boolean}
 */
export const isTypeOf = (value, type) => typeof value === type;

/**
 * @memberOf Utils.Types
 * @type {function}
 * @param {*} value
 * @return {boolean}
 */
export const isObject = (value) => {
  return value && isTypeOf(value, 'object') && !Array.isArray(value);
};

/**
 * @memberOf Utils.Types
 * @type {function}
 * @param {*} value
 * @return {boolean}
 */
export const isArray = (value) => {
  return value && isTypeOf(value, 'object') && Array.isArray(value);
};
