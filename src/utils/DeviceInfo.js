/*
 * File: DeviceInfo.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 11:40:24 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

const BREAKPOINTS = {
  sm: 575, // Mobile
  md: 991, // Tab
};

const TABLET_PATTERN = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
const MOBILE_PATTERN =
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i;

/**
 * getScrollTop
 * @returns {number} - browser scrollTop position
 */
export const getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;

/**
 * getDimensions
 * @returns {object} - browser dimentions
 */
export const getDimensions = () => {
  const dims = {
    scrollTop: getScrollTop(),
  };

  const offsets = { Height: 'height', Width: 'width' };

  Object.keys(offsets).forEach((key) => {
    dims[offsets[key]] = Math.max(
      document.documentElement[`client${key}`],
      window[`inner${key}`],
      0
    );
  });

  const { width } = dims;

  return {
    ...dims,
    isMobile: width < BREAKPOINTS.sm,
    isTablet: width >= BREAKPOINTS.sm && width <= BREAKPOINTS.md,
    isDesktop: width > BREAKPOINTS.md,
  };
};

/**
 * getDeviceType
 * @returns {object} - device type
 */
export const getDeviceType = (userAgent) => {
  let isTablet = false;
  let isMobile = false;
  let isDesktop = false;

  if (TABLET_PATTERN.test(userAgent)) {
    isTablet = true;
  } else if (MOBILE_PATTERN.test(userAgent)) {
    isMobile = true;
  } else {
    isDesktop = true;
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

/**
 * Function - Fetch GeoLocation
 * @returns
 */
export const getGeoLocation = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};
