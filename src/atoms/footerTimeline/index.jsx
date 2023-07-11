/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Oct 28 2022 5:40:14 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { string, bool } from 'prop-types';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import styles from './FooterTimeline.module.scss';

const FooterTimeline = ({ active, nextRoute, noContinue }) => {
  const router = useRouter();

  const handleClick = (type) => {
    switch (type) {
      case 'Selection':
        router.push('/preferences');
        break;
      case 'Review':
        router.push('/store-details');
        break;
      case 'Planning':
        router.push('/calendar');
        break;
      case 'Cart':
        router.push('/cart');
        break;
      case 'home':
        router.push('/preferences');
        break;
      default:
        router.push(nextRoute);
        break;
    }
  };

  return (
    <Row className={`${styles.footertimeline} fullwidth`} justify='center' align='center'>
      <Col md={24}>
        <div className={styles.buttonscontainer}>
          <div
            className={`${styles.button} ${
              active === 'Selection' ||
              active === 'Review' ||
              active === 'Planning' ||
              active === 'Cart'
                ? styles.active
                : ''
            }`}
            onClick={() => handleClick('Selection')}
          >
            Selection
          </div>
          <div
            className={`${styles.button} ${
              active === 'Review' || active === 'Planning' || active === 'Cart' ? styles.active : ''
            }`}
            onClick={() => handleClick('Review')}
          >
            Review
          </div>
          <div
            className={`${styles.button} ${
              active === 'Planning' || active === 'Cart' ? styles.active : ''
            }`}
            onClick={() => handleClick('Planning')}
          >
            Planning
          </div>
          <div
            className={`${styles.button} ${active === 'Cart' ? styles.active : ''}`}
            onClick={() => handleClick('Cart')}
          >
            Cart
          </div>
          {!noContinue ? (
            <div className={`${styles.button} ${styles.active}`} onClick={() => handleClick('continue')}>
              CONTINUE
            </div>
          ) : (
              <div className={`${styles.button} ${styles.active}`} onClick={() => handleClick('home')}>
              HOME
            </div>
          )}
        </div>
      </Col>
      {/* <Col md={4} className={styles.homebtn}>
        {!noContinue ? (
          <div className={styles.button} onClick={() => handleClick('continue')}>
            CONTINUE
          </div>
        ) : (
          <div className={styles.button} onClick={() => handleClick('home')}>
            HOME
          </div>
        )}
      </Col> */}
    </Row>
  );
};

FooterTimeline.defaultProps = {
  active: 'Selection',
  noContinue: false,
};

FooterTimeline.propTypes = {
  active: string,
  nextRoute: string,
  noContinue: bool,
};

export default FooterTimeline;
