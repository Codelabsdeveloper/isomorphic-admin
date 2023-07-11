/*
 * File: Logger.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:40:58 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

/* eslint-disable no-console */
// const logConfig = process.env.log;
const logConfig = {
  error: true,
  warn: true,
  info: true,
  log: true,
};
const isDev = process.env.NODE_ENV === 'development';

const formatMessage = (val, trace) => {
  return `${JSON.stringify(val)} ${trace ? JSON.stringify(trace) : ''}`;
};

const logger = {
  error: (val, trace) =>
    (isDev || logConfig?.error) && console.error(`[code-labs] ${formatMessage(val)}`, trace),
  warn: (val, trace) =>
    (isDev || logConfig?.warn) && console.warn(`[code-labs] ${formatMessage(val, trace)}`),
  info: (val, trace) =>
    (isDev || logConfig?.info) && console.info(`[code-labs] ${formatMessage(val, trace)}`),
};

export default logger;
