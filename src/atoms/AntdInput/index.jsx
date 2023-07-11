/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 25 2022 2:51:36 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { string, object, bool } from 'prop-types';
import { Input, Row } from 'antd';
import Typography from '@Atoms/typography';
import styles from './AntdInput.module.scss';
import Label from '@Atoms/label';

const AntdInput = ({ label, errorMgs, size, forwardRef, disabled, required, ...rest }) => {
  return (
    <Row className={styles.antdInput}>
      <Label label={label} required={required} />
      <Input
        size={size}
        {...rest}
        {...(forwardRef && { ref: forwardRef })}
        className={disabled ? styles.disabled : ''}
        disabled={disabled}
      />
      <Typography variant="p" theme="error" className="field-errors">
        {errorMgs}
      </Typography>
    </Row>
  );
};

AntdInput.defaultProps = {
  errorMgs: '',
  size: 'large',
};

AntdInput.propTypes = {
  errorMgs: string,
  size: string,
  forwardRef: object,
  disabled: bool,
  label: string,
  required: bool,
};

export default AntdInput;
