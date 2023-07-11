/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 08 2022 11:00:04 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { Row } from 'antd';
import { string } from 'prop-types';
import Typography from '@Atoms/typography';
import styles from './DashedContent.module.scss';

const DashedContent = ({ label }) => {
  return (
    <Row className={styles.dashedContent}>
      <span>
        <Typography variant="p">{label}</Typography>
      </span>
    </Row>
  );
};

DashedContent.propTypes = {
  label: string,
};

export default DashedContent;
