/*
 * File: AppLayout.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Aug 31 2022 2:09:07 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import ErrorBoundary from '@Components/errorBoundary/ErrorBoundary';
import { func, node, oneOfType, string } from 'prop-types';
import useBrowserLayoutEffect from '@Hooks/UseBrowserLayoutEffect';
import { updatePageDimensions, updateScrollPosition } from '@Store/deviceInfoSlice';
import { getDimensions, getScrollTop } from '@Utils/DeviceInfo';
import { useDispatch } from 'react-redux';

let dimensionsTimeoutTracker = null;
let scrollTimeoutTracker = null;

/**
 * Component AppLayout
 * @param {string|node} children - Child elements to render
 * @param {string|node} customHeader - Custom Header to render
 * @param {string|node} customFooter - Custom Footer to render
 * @returns
 */
const AppLayout = ({ children }) => {
  const dispatch = useDispatch();

  // Track window dimensions and add them to our redux store
  const trackWindowDimensions = () =>
    window.requestAnimationFrame(() => {
      clearTimeout(dimensionsTimeoutTracker);
      dimensionsTimeoutTracker = setTimeout(() => {
        dispatch(updatePageDimensions(getDimensions()));
      }, 50);
    });

  // Track scrollTop and update in redux store
  const trackScrollTop = () =>
    window.requestAnimationFrame(() => {
      clearTimeout(scrollTimeoutTracker);
      scrollTimeoutTracker = setTimeout(() => {
        dispatch(updateScrollPosition(getScrollTop()));
      }, 100);
    });

  useBrowserLayoutEffect(() => {
    // Listen for window resize
    trackWindowDimensions();
    window.addEventListener('resize', trackWindowDimensions, false);

    // Listen for window scroll
    trackScrollTop();
    window.addEventListener('scroll', trackScrollTop, false);

    return () => {
      window.removeEventListener('resize', trackWindowDimensions);
      window.removeEventListener('scroll', trackScrollTop);
    };
  }, []);

  return (
    <>
      <React.Fragment>
        <ErrorBoundary>
          <div id="eb-main" role="main" aria-live="polite">
            {children}
          </div>
        </ErrorBoundary>
      </React.Fragment>
    </>
  );
};

AppLayout.propTypes = {
  children: oneOfType([string, node]).isRequired,
  customHeader: func,
  customFooter: func,
};

AppLayout.defaultProps = {
  customHeader: null,
  customFooter: null,
};

export default AppLayout;
