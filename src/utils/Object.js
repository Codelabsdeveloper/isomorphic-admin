/*
 * File: Object.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:43:27 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import logger from './Logger';
import { isObject } from './Types';

/**
 * Returns a new object with the keys as upper or lower case.
 * NOTE: if as part of the key transformation a key already exists, the value will become an array.
 * @memberOf Utils.Object
 * @type {function}
 * @param {object} object
 * @param {boolean} toUpperCase
 * @returns {object} normalizedObject
 */
export const normalizeKeys = (object, toUpperCase = false) => {
  const normalizedObject = {};
  if (isObject(object)) {
    Object.keys(object).forEach((key) => {
      const normalizedKey = toUpperCase ? key.toUpperCase() : key.toLowerCase();
      if (normalizedObject[normalizedKey]) {
        normalizedObject[normalizedKey] = [normalizedObject[normalizedKey], object[key]];
        logger.warn(
          `Normalized key: ${normalizedKey} already present in source object, value for: "${key}" will be pushed to an array.`,
          object
        );
      } else {
        normalizedObject[normalizedKey] = object[key];
      }
    });
  } else {
    logger.error('Parameter received is not an object', object);
  }
  return normalizedObject;
};

/**
 * Return a new object resulting from merging all objects that were sent to this function.
 * NOTE: The last object send will take precedence.
 * @memberOf Utilities.Object
 * @type {function}
 * @param {...object} objects
 * @returns {object} mergedObject
 */
export const mergeObjects = (...objects) => {
  let mergedObject = {};
  if (objects.length) {
    objects.forEach((object) => {
      if (isObject(object)) {
        mergedObject = { ...mergedObject, ...object };
      } else {
        logger.error(
          'Parameter received is not an object, will not be considered for merge',
          object
        );
      }
    });
  }
  return mergedObject;
};
