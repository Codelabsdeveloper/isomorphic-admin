/*
 * File: LazyObserver.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 8:06:01 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import useBrowserLayoutEffect from '@Hooks/UseBrowserLayoutEffect';
import { isTypeOf } from '@Utils/Types';
import { bool, func, node, object, oneOfType, string } from 'prop-types';
import { useRef } from 'react';
require('intersection-observer');

const isIntersectObserverSupported =
  typeof window !== 'undefined' && !!window?.IntersectionObserver;

/**
 * LazyObserver Component
 * @param {node} children - Child component to render
 * @param {boolean} oberve - Flag to Observe the element in viewport 
 * @param {string} options.rootMargin - A string which specifies a set of offsets to 
                                                    add to the root's bounding box
 * @param {string} options.threshold - Either a single number or an array of numbers between 0.0 and 1.0, 
                                                   specifying a ratio of intersection area to total bounding box area 
                                                   for the observed target
 * @param {function} handleOnIntersection - Callback function to trigger when Intersected
 * @param {function} handleOnIntersectionFallback - Callback function to trigger incase of failures
 * @returns {*}
 */

const LazyObserver = ({
  children,
  options,
  observe,
  handleOnIntersection,
  handleOnIntersectionFallback,
}) => {
  if (!children) return null;

  if (!observe) return children;

  const lazyRef = children.ref ?? useRef();
  const refs = {
    ...(isTypeOf(children.type, 'function') ? { forwardRef: lazyRef } : { ref: lazyRef }),
  };

  const initObserver = () => {
    if (isIntersectObserverSupported && handleOnIntersection && lazyRef?.current) {
      let lazyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          /* istanbul ignore else */
          if (entry.isIntersecting) {
            const lazyElem = entry.target;

            handleOnIntersection(lazyElem);
            lazyObserver.unobserve(lazyElem);
          }
        });
      }, options);

      lazyObserver.observe(lazyRef?.current);
    } else {
      handleOnIntersectionFallback && handleOnIntersectionFallback(lazyRef?.current);
    }
  };

  useBrowserLayoutEffect(() => {
    initObserver();
  }, []);

  return <children.type {...children.props} {...refs} />;
};

LazyObserver.propTypes = {
  observe: bool,
  handleOnIntersection: func,
  handleOnIntersectionFallback: func,
  options: object,
  children: oneOfType([string, node]).isRequired,
};

LazyObserver.defaultProps = {
  options: {
    rootMargin: '200px',
    threshold: 0.01,
  },
  handleOnIntersection: null,
  handleOnIntersectionFallback: null,
  observe: true,
};

export default LazyObserver;
