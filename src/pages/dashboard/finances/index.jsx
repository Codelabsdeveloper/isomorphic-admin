/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Sep 28 2022 2:15:36 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { Row, Col, Divider } from 'antd';
// import Icon from '@Atoms/icon/Icon';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';
import styles from './Finances.module.scss';
// import dynamic from 'next/dynamic';

// const DashboardLayout = dynamic(() => import('@Atoms/dashboardLayout'), { ssr: false });

const Finances = () => {
  return (
    // <DashboardLayout>
    <Row className={styles.mainContainer}>
      <Typography variant="h4">Finances</Typography>
      <Col span={24} className={styles.dataStart}>
        <Row>
          <Col span={6}>
            <Typography variant="h5">Money Spent Date :</Typography>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Typography variant="h5">Specifics Vs Total Report</Typography>
          </Col>
          <Col span={2}>
            <Button theme="tertiary" className={styles.button}>
              View
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Typography variant="h5">Campaign - Based Spend :</Typography>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Typography variant="h5">Grand Total Spend :</Typography>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Typography variant="h5">Potential ROI :</Typography>
          </Col>
        </Row>
      </Col>
    </Row>
    // </DashboardLayout>
  );
};

export default Finances;
