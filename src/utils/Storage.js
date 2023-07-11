/*
 * File: Storage.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:43:03 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import logger from '@Utils/Logger';
import { isTypeOf } from '@Utils/Types';

/**
 * Returns storage type
 * @param {boolen} isSession - Flags to decide between localStorage and sessionStorage
 * @returns {object}
 */
const storage = (isSession) => (isSession ? sessionStorage : localStorage);

/**
 * Returns the value mapped to the "key" sent to the function.
 * @type {function}
 * @param {string} key - Identifier on client storage.
 * @param {boolean} parse - Flag to control if the value should be parsed on retrieval.
 * @param {boolean} session - Flag to switch the storage type (set true for sessionstorage)
 * @return {*}
 */
const getItem = (key, parse = true, session) => {
  try {
    const value = storage(session)?.getItem(key);
    if (value) {
      try {
        return parse ? JSON.parse(value) : value;
      } catch (e) {
        logger.error(`Error occurred while parsing key: "${key}"`, { key, value });
      }
    }
  } catch (e) {
    logger.error(`Error occurred reading key: "${key}"`);
  }
};

/**
 * Writes an item to Storage and return a boolean as a result of the operation.
 * @type {function}
 * @param {string} key - Value to be the key on client storage.
 * @param {*} value - Value corresponding to the key passed as first parameter.
 * @param {boolean} session - Flag to switch the storage type (set true for sessionstorage)
 * @return {boolean}
 */
const setItem = (key, value, session) => {
  if (key) {
    try {
      const stringifiedValue = isTypeOf(value, 'string') ? value : JSON.stringify(value);
      try {
        storage(session)?.setItem(key, stringifiedValue);
        return true;
      } catch (e) {
        logger.error(`Error occurred while persisting value for key: "${key}"`, {
          key,
          value,
        });
      }
    } catch (e) {
      logger.error(`Error occurred calling stringify value for key: "${key}"`, {
        key,
        value,
      });
    }
  }
  return false;
};

/**
 * Removes an item from Storage and return a boolean as a result of the operation.
 * @type {function}
 * @param {string} key - Value to be the key on client storage.
 * @param {boolean} session - Flag to switch the storage type (set true for sessionstorage)
 * @return {boolean}
 */
const removeItem = (key, session) => {
  if (key) {
    try {
      const size = storage(session).length;
      storage(session)?.removeItem(key);
      return storage(session).length < size;
    } catch (e) {
      logger.error(`Error occurred while removing key: "${key}"`);
    }
  } else {
    logger.warn('Key not provided to removeItem from storage.');
  }
  return false;
};

export default {
  getItem,
  setItem,
  removeItem,
};
