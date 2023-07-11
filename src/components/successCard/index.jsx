/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 4:15:49 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { Row } from 'antd';
import { string, bool, func } from 'prop-types';
import SuccessTick from '@Atoms/successTick';
import Card from '@Components/card';
import styles from './SuccessCard.module.scss';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';

const SuccessCard = ({ title, subtitle, showButton, buttonLable, handleSubmit, submitting }) => {
  return (
    <Row>
      <Card shadow className={styles.successCard}>
        <SuccessTick />
        <Row className={styles.content}>
          <Typography variant="h3" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="p" className={styles.subtitle}>
            {subtitle}
          </Typography>
        </Row>
        {showButton && (
          <Row justify="end">
            <Button
              size="small"
              onClick={handleSubmit}
              action="submit"
              isProcessing={submitting}
              processingLabel="Processing"
            >
              {buttonLable}
            </Button>
          </Row>
        )}
      </Card>
    </Row>
  );
};

SuccessCard.defaultProps = {
  title: '',
  subtitle: '',
  showButton: false,
  buttonLable: '',
  submitting: false,
};

SuccessCard.propTypes = {
  title: string.isRequired,
  subtitle: string,
  showButton: bool,
  buttonLable: string,
  handleSubmit: func,
  submitting: bool,
};

export default SuccessCard;
