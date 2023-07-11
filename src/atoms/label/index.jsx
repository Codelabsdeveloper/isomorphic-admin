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
import { string, bool } from 'prop-types';
import Typography from '@Atoms/typography';
import styles from './Label.module.scss';

const Label = ({ label, required }) => {
  return (
    <Typography className={styles.label} variant="h5">
      {label}
      {required && <span>*</span>}
    </Typography>
  );
};

Label.propTypes = {
  label: string,
  required: bool,
};

export default Label;
