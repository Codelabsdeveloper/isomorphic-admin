/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 02 2022 11:38:15 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { func, node, object, oneOf, oneOfType, string } from 'prop-types';
import React from 'react';
import styles from './Typography.module.scss';
import { typographyTypes } from './TypographyTypes';

/**
 * Typography Component
 * @param {any} children - Child Text node within the Typography component
 * @param {string} variant - Type of element that the typography component will create - e.g. "h1", "h2" or "p"
 * @param {string} className - Css class that can be passed to overwrite default app rules
 * @param {string} id - id to place on typography component
 * @param {function} onClick - onClick callback
 * @param {string} theme - Typography Theme
 * @returns {*}
 */
const Typography = ({
  children,
  variant,
  className,
  id,
  onClick,
  theme,
  forwardRef,
  ...restProps
}) => {
  const classes = [styles[`tag_${variant}`], theme ? styles[`theme-${theme}`] : '', className]
    .join(' ')
    .trim();
  const elementProps = {
    className: classes,
    id: id,
    onClick: onClick,
    ...(forwardRef && { ref: forwardRef }),
    ...restProps,
  };

  return React.createElement(variant, elementProps, children);
};

Typography.propTypes = {
  children: oneOfType([string, node]),
  variant: oneOf(typographyTypes),
  className: string,
  id: string,
  onClick: func,
  theme: oneOf(['warning', 'error']),
  forwardRef: oneOfType([func, object]),
};

Typography.defaultProps = {
  variant: 'h1',
  className: '',
  id: null,
  onClick: null,
  children: '',
  theme: null,
  forwardRef: null,
};

export { typographyTypes };

export default Typography;
