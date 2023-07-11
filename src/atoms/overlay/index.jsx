/*
 * File: index.jsx
 * Project: Shoprsmart
 * Created Date: Mon Sep 12 2022 2:13:18 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 1:40:53 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */

import React from 'react';
import { Row } from 'antd';
import { node, oneOfType, string } from 'prop-types';
import styles from './Overlay.module.scss';

const Overlay = ({ children }) => {
  return (
    <>
      <Row className={styles.overlay} />
      <Row className={styles.content}>{children}</Row>
    </>
  );
};

Overlay.propTypes = {
  children: oneOfType([string, node]),
};

Overlay.defaultProps = {};

export default Overlay;
