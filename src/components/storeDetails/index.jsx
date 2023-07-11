import React from 'react';
import { string } from 'prop-types';
import { Row, Col } from 'antd';
import ReadOnly from '@Atoms/readOnly';
import Typography from '@Atoms/typography';
import styles from '@Styles/StoreFields.module.scss';

const StoreFields = ({ label, value }) => {
  return (
    <Row className={styles.storefields}>
      <Row align="middle" className={styles.storefields}>
        <Col md={6}>
          <Typography variant="h5">{label}:</Typography>
        </Col>
        <Col md={16}>
          <ReadOnly value={value} theme="primary" />
        </Col>
      </Row>
    </Row>
  );
};

StoreFields.propTypes = {
  label: string,
  value: string,
};

export default StoreFields;
