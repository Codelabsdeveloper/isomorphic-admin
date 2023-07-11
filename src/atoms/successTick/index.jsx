/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 4:03:09 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { Row } from 'antd';
import styles from './SuccessTick.module.scss';
import Icon from '../icon/Icon';

const SuccessTick = () => {
  return (
    <Row justify="center" align="middle">
      <div className={styles.successTick}>
        <div className={styles.maincircle}>
          <div className={styles.outercircle}>
            <div className={styles.innercircle}>
              <Icon iconName="check" />
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default SuccessTick;
