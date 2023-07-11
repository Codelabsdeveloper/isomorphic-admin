/*
 * File: env.config.js
 * Project: codelabs-boilderplate
 * Created Date: Sat Aug 27 2022 2:44:15 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

var envConfig = {
  log: JSON.parse(process.env.log || '{}'), //must be a string
  API_BASE_URI: process.env.API_BASE_URI || '',
  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID ||
    // '57163381511-cj3vnttnvjo18dftb2v7ciio7emaltpi.apps.googleusercontent.com',
    '371618296463-9vitsdprt28sdtnt7lklp1kjci2os8kc.apps.googleusercontent.com',
  GOOGLE_USER_INFO_API:
    process.env.GOOGLE_USER_INFO_API || 'https://www.googleapis.com/oauth2/v3/userinfo',
  // GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyDrEyii2l-JMtTbkD_AOD-fhYIWDNz9gEQ',
  GOOGLE_MAPS_API_KEY: '',
};

module.exports = envConfig;
