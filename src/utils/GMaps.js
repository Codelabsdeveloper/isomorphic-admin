/*
 * File: GMaps.js
 * Project: mobile-web-common-sdk
 * File Created: Tuesday, 17th September 2019 2:49:20 pm
 * Author: Jebarin (j.jebarin@gmail.com)
 * -----
 * Last Modified: Thursday December 9th 2021 12:23:46 am
 * Modified By: Jebarin <j.jebarin@gmail.com>
 * -----
 * Copyright 2019
 */
import logger from '@Utils/Logger';
// import getEnv from '@Utils/Env';

import envConfig from 'env.config';

const defaultsOptions = {
  apiUrl: envConfig.GOOGLE_MAPS_API_KEY,
};

/**
 * GMaps
 * Class to load google maps api with api key
 * and provide callback to init map after resolution of promise.
 * @exports {GMaps}
 * @example mapApi = new GMaps();
 *          mapApi.load().then(() => {});
 * @returns {promise}
 */
class GMaps {
  constructor() {
    // Set callback
    /*istanbul ignore else*/
    if (typeof window !== 'undefined' && !window._GoogleMapsApi) {
      this.callbackName = '_GoogleMapsApi.mapLoaded';
      window._GoogleMapsApi = {};
      window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
    }
  }

  /**
   * Load
   * Create script element with google maps
   * api url, containing api key and callback for
   * map init.
   * @return {promise}
   * @this {_GoogleMapsApi}
   */
  load() {
    /*istanbul ignore else*/
    if (!this.promise) {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        try {
          if (window && typeof window.google === 'undefined') {
            logger.info('Calling Javascript Maps API');
            const script = document.createElement('script');
            script.src = defaultsOptions.apiUrl;
            script.async = true;
            script.addEventListener(
              'error',
              // istanbul ignore next
              function () {
                logger.error('Error while trying to download google maps sdk ');
                reject();
              },
              true
            );
            document.body.append(script);
          } else {
            logger.info('Maps API instance already found!. It can be accessed using window.google');
            this.resolve(window.google);
          }
        } catch (e) {
          // istanbul ignore next
          logger.error('Exception in ' + this.constructor.name + '. error details - ' + e);
        }
      });
    }

    return this.promise;
  }

  /**
   * mapLoaded
   * Global callback for loaded/resolved map instance.
   * @this {_GoogleMapsApi}
   *
   */
  mapLoaded() {
    if (this.resolve && window.google) {
      logger.info('Maps API downloaded. It can be accessed using window.google');
      return this.resolve(window.google);
    }
    logger.warn('google object not defined globally');
    return this.reject(null);
  }
}

export default new GMaps();
