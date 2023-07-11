/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 02 2022 9:33:25 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { bool, func, node, oneOf, oneOfType, shape, string } from 'prop-types';
import styles from './Button.module.scss';

/**
 * Button Component
 * @param {string} id - Id tag for button
 * @param {boolean} isProcessing - Show the spinner when the promise is being resolved
 * @param {string} processingLabel - Alternaive Label to show on loading/processing
 * @param {string} theme - Theme of button, options - ("rr-navy", "rr-skyblue", "rr-iceblue", "rr-green", "white")
 * @param {string} className - Classname to override button styles
 * @param {string} size - Button size
 * @param {boolean} disabled - Disabled state for Button (true or false)
 * @param {funtion} onClick - Handles click callback
 * @param {node} children - Text / Child element
 * @returns {*}
 * @constructor
 */
const Button = ({
  id,
  isProcessing,
  theme,
  className,
  size,
  disabled,
  onClick,
  children,
  action,
  processingLabel,
  hrefProps,
  ...rest
}) => {
  const classes = [styles.btn, styles[`theme-${theme}`], styles[`size-${size}`], className]
    .join(' ')
    .trim();

  return (
    <>
      {Object.keys(hrefProps)?.length ? (
        <a className={classes} {...hrefProps}>
          {children}
        </a>
      ) : (
        <button
          type={action}
          id={id}
          className={classes}
          disabled={isProcessing || disabled}
          onClick={onClick}
          {...rest}
        >
          {isProcessing && <span className={styles.spinner} />}
          {isProcessing ? processingLabel : children}
        </button>
      )}
    </>
  );
};

// Perform Prop Validation
Button.propTypes = {
  children: oneOfType([string, node]),
  id: string,
  isProcessing: bool,
  className: string,
  disabled: bool,
  theme: oneOf([
    'primary',
    'primary-light',
    'secondary',
    'secondary-light',
    'tertiary',
    'tertiary-light',
  ]),
  size: string,
  action: oneOf(['button', 'submit', 'reset']),
  onClick: func,
  processingLabel: string,
  hrefProps: shape({}),
};

// Declare default props
Button.defaultProps = {
  id: null,
  isProcessing: false,
  theme: 'primary',
  className: '',
  size: 'medium',
  disabled: false,
  action: 'button',
  onClick: null,
  processingLabel: 'Processing...',
  hrefProps: {},
};

// Export the component
export default Button;
