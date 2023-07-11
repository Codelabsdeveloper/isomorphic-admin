/*
 * File: Url.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:42:43 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import PATTERNS from './Patterns';

/**
 * Function - Converts String to Slug
 * @param {string} string - string to convert
 * @returns {string}
 */
export const convertStringToSlug = (string) => {
  return string?.trim()?.toLocaleLowerCase()?.replace(PATTERNS.REMOVE_ALL_SPACE, '-') ?? '';
};

/**
 * Function - Constructs Query String from Object
 * @param {object} obj - Data in Object
 * @returns
 */
export const constructQueryString = (obj) => {
  return (
    obj &&
    Object.entries(obj)
      ?.map(([key, val]) => (val ? `${key}=${val}` : null))
      ?.filter((val) => val)
      ?.join('&')
  );
};

/**
 * Function - Converts Url String to Object
 * @param {string} queryString - Query string
 * @returns
 */
export const convertQueryStringToObject = (queryString) => {
  let queryObj = {};

  if (!queryString) return queryObj;

  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  pairs?.map((pair) => {
    const obj = pair.split('=');
    if (obj?.[0]) queryObj[obj[0]] = obj?.[1];
  });

  return queryObj;
};
