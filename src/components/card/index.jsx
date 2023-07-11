/*
 * File: Index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sat Sep 03 2022 2:19:49 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { node, oneOfType, string, bool } from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ children, shadow, className }) => {
  const classes = [styles.card, styles[shadow ? 'Shadow' : false], className].join(' ').trim();

  return <div className={classes}>{children}</div>;
};

Card.defaultProps = {
  shadow: false,
};

Card.propTypes = {
  children: oneOfType([string, node]),
  shadow: bool,
  className: string,
};

export default Card;
