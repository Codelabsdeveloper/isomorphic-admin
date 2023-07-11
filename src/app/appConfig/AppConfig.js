/*
 * File: AppConfig.js
 * Project: codelabs-boilderplate
 * Created Date: Sat Sep 03 2022 12:14:20 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { normalizeKeys } from '@Utils/Object';
import defaultLocale from '../../locales/en-US.json';

const defaultConfigs = {};

const configManager = {
  config: normalizeKeys(defaultConfigs),
  cms: {
    messages: normalizeKeys(defaultLocale.messages),
    errors: normalizeKeys(defaultLocale.errors),
  },
};

/**
 * AppConfig Class for CnC Module
 */
class AppConfig {
  /**
   * Retrieves the requestedKey from data.cms.errors or returns defaultValue / null if passed.
   * @type {function}
   * @param {string} requestedKey
   * @param {*} defaultReturn
   * @returns {*|null}
   */
  getCMSError(requestedKey, defaultReturn = null) {
    const path = requestedKey.split('.');

    return path.reduce(
      (xs, key) => (xs && xs[key] ? xs[key] : defaultReturn),
      configManager.cms.errors
    );
  }

  /**
   * Retrieves the requestedKey from data.cms.messages or returns defaultValue / null if passed.
   * @type {function}
   * @param {string} requestedKey
   * @param {*} defaultReturn
   * @returns {*|null}
   */
  getCMSMessage(requestedKey = '', defaultReturn = null) {
    const path = requestedKey.split('.');

    return path.reduce(
      (xs, key) => (xs && xs[key] ? xs[key] : defaultReturn),
      configManager.cms.messages
    );
  }
}

export default new AppConfig();
