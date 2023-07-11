/*
 * File: Cookies.js
 * Project: eb-reebok
 * Created Date: Monday, May 3rd 2021, 1:08:25 pm
 * Author: Nelson <jebarin.johnrose@nutechnologyinc.com>
 * -----
 * Copyright (c) 2021 All rights reserved
 * ------------------------------------
 */
// import { getRequestCookies } from '@App/AppContext';
import logger from '@Utils/Logger';

// Add the cookies Name here to be Encrypted & Decrypted
const EncryptedCookiesList = [];

/**
 * Returns the cookie value mapped to the "name" sent to the function.
 * @type {function}
 * @param {string} name
 * @return {string|undefined}
 */
export const getCookie = (name) => {
  if (name) {
    try {
      if (name) {
        if (EncryptedCookiesList.includes(name)) {
          return decodeURIComponent(name);
        } else {
          return unescape(name);
        }
      } else {
        logger.warn(`matching cookie ${name} not found `, { name });
      }
    } catch (error) {
      logger.error(`Error occurred while reading cookie : "${name}"`, { name, error });
    }
  }
};

/**
 * Creates and returns cookie string
 * @type {function}
 * @param {string} name
 * @param {*} value
 * @param {string} expiration
 * @param {boolean} secure
 * @param {boolean} httpOnly
 * @return {string}
 */
export function constructCookieString(
  name,
  value,
  expiration = '',
  secure = false,
  httpOnly = true
) {
  try {
    const cookieValue = EncryptedCookiesList.includes(name) ? encodeURIComponent(value) : value;
    return `${name}=${cookieValue}; path=/;expires=${expiration}${secure ? ';secure' : ''}${
      httpOnly ? ';httpOnly' : ''
    }`;
  } catch (error) {
    logger.error(`Error occurred calling constructCookieString for "${name}"`, {
      name,
      value,
      expiration,
      secure,
      error,
    });
    return false;
  }
}

/**
 * Creates a new cookie and return a boolean as a result of the operation.
 * @type {function}
 * @param {string} name
 * @param {*} value
 * @param {string} expiration
 * @param {boolean} secure
 * @param {boolean} httpOnly
 * @return {boolean}
 */
export function setCookie(name, value, expiration = '', secure = false, httpOnly = false) {
  try {
    const isSecure = secure && window?.location?.protocol === 'https:';
    document.cookie = constructCookieString(name, value, expiration, isSecure, httpOnly);
    return true;
  } catch (error) {
    logger.error(`Error occurred calling setCookie for "${name}"`, {
      name,
      value,
      expiration,
      secure,
      error,
    });
    return false;
  }
}

/**
 * Creates a new cookie in the server response and return a boolean as a result of the operation.
 * @type {function}
 * @param {string} name
 * @param {*} value
 * @param {string} expiration
 * @param {boolean} secure
 * @param {boolean} httpOnly
 * @return {object}
 */
export function setResponseCookie(
  responseContex,
  name,
  value,
  expiration = '',
  secure = false,
  httpOnly
) {
  if (!responseContex) return null;

  try {
    const cookieStr = constructCookieString(name, value, expiration, secure, httpOnly);

    return responseContex?.setHeader('set-cookie', [cookieStr]);
  } catch (error) {
    logger.error(`Error occurred calling setResponseCookie for "${name}"`, {
      name,
      value,
      expiration,
      secure,
      error,
    });
    return false;
  }
}

/**
 * Removes a cookie and return a boolean as a result of the operation.
 * @type {function}
 * @param {string} name
 * @return {boolean}
 */
export function deleteCookie(name) {
  try {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    return true;
  } catch (error) {
    logger.error(`Error occurred while deleting cookie "${name}"`, { name, error });
    return false;
  }
}
