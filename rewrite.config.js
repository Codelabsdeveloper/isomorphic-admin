/*
 * File: rewrite.config.js
 * Project: codelabs-boilderplate
 * Created Date: Sat Aug 27 2022 2:44:26 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

var envConfig = require('./env.config');

module.exports = {
  common: [],
  development: [
    {
      source: '/proxy-api/rest/:path*',
      destination: `${envConfig.API_BASE_URI}/:path*`,
    },
  ],
  production: [],
};
