/*
 * File: thank-you.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 3:52:38 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import React from 'react';
import { Row } from 'antd';
import SuccessCard from '@Components/successCard';
import styles from '@Styles/ConfirmCartPage.module.scss';
import { useRouter } from 'next/router';
import Logo from '@Assets/images/logo.png';
import Image from '@Atoms/image/Image';

const ConfirmCart = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/dashboard');
  };
  return (
    <>
      <Row className={`fullwidth ${styles.logo}`}>
        <Image className={styles.imgLogo} src={Logo.src} />
      </Row>
      <Row justify="center" align="middle" className={styles.confirmCartpage}>
        <Row>
          <SuccessCard
            showButton
            title={AppConfig.getCMSMessage('cart.formSuccess.title')}
            subtitle={AppConfig.getCMSMessage('cart.formSuccess.subTitle')}
            buttonLable={AppConfig.getCMSMessage('cart.formSuccess.next_button')}
            handleSubmit={handleSubmit}
          />
        </Row>
      </Row>
    </>
  );
};

ConfirmCart.propTypes = {};

export default ConfirmCart;
