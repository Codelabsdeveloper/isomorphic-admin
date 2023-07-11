/*
 * File: Env.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 1:47:32 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

/**
 * Function to return env variables
 * @param {string} key - key to fetch env variable
 * @returns
 */
const getEnv = (key) => {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(window?.EBD?.[key]);
    } catch (err) {
      return window?.EBD?.[key];
    }
  }

  return process?.env?.[key];
};

export default getEnv;
