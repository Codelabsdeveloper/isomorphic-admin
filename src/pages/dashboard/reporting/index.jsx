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
import styles from './Reporting.module.scss';
// import dynamic from 'next/dynamic';

// const DashboardLayout = dynamic(() => import('@Atoms/dashboardLayout'), { ssr: false });

const Reporting = () => {
  return (
    // <DashboardLayout>
    <Row className={styles.mainContainer}>
      <Typography variant="h4">Reporting</Typography>
      <Col span={24} className={styles.dataStart}>
        <Row>
          <Col span={6}>
            <Typography variant="h5">Invoice</Typography>
          </Col>
          <Col span={2}>
            <Button
              theme="tertiary"
              className={styles.button}
              // onClick={() => handleClick()}
            >
              View
            </Button>
          </Col>
          {/* <Col span={2}>
            <Button theme="tertiary" className={styles.button}>
              Download
            </Button>
          </Col> */}
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Typography variant="h5">Campaign History</Typography>
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
            <Typography variant="h5">Avg Footfall</Typography>
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
            <Typography variant="h5">Proforma Invoice</Typography>
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
            <Typography variant="h5">QR Code - Responsive Report</Typography>
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
            <Typography variant="h5">Comparsion Report</Typography>
          </Col>
          <Col span={2}>
            <Button theme="tertiary" className={styles.button}>
              View
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
    // </DashboardLayout>
  );
};

export default Reporting;
