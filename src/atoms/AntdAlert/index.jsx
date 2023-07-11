/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 25 2022 10:27:11 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { oneOfType, string, node, bool, func, oneOf } from 'prop-types';
import { Alert, Row } from 'antd';
import styles from './AntdAlert.module.scss';

const AntdAlert = ({
  children,
  closeText,
  closable,
  showIcon,
  onClose,
  type,
  message,
  description,
  fullwidth,
}) => {
  return (
    <Row className={`${styles.antdAlert} fullwidth`}>
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon={showIcon}
        closable={closable}
        closeText={closeText}
        action={children}
        onClose={onClose}
        className={fullwidth ? styles.fullalert : ''}
      />
    </Row>
  );
};

AntdAlert.defaultProps = {
  closeText: '',
  closable: false,
  showIcon: false,
  type: 'success',
  message: '',
  description: '',
  fullwidth: false,
};

AntdAlert.propTypes = {
  children: oneOfType([string, node]),
  closeText: string,
  closable: bool,
  showIcon: bool,
  onClose: func,
  type: oneOf(['success', 'info', 'warning', 'error']),
  message: string,
  description: string,
  fullwidth: bool,
};

export default AntdAlert;
