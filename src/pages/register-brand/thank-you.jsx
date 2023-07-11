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
import React, { useEffect } from 'react';
import { Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SuccessCard from '@Components/successCard';
import styles from '@Styles/ThankyouPage.module.scss';
import { useRouter } from 'next/router';
import Logo from '@Assets/images/logo.png';
import Image from '@Atoms/image/Image';
// import { getFromLocalStorage, removeLocalStorage } from '@Utils/StorageUtil';
import { handleLogoutAction } from '@Store/login-store/loginAction';
// import { thankyouLogout } from '@Store/brand-register/brandAction';
// import { STORAGE } from '@Constants/constants';

// const validEmailIds = [
//   'anupsveerapur@gmail.com',
//   'srikanth@erevu.in',
//   'vivek@erevu.in',
//   'barath@erevu.in',
// ];

const ThankYou = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { thankYouLogoutResponse } = useSelector((state) => state.brandSlice);

  const logout = () => {
    dispatch(handleLogoutAction());
    window.localStorage.clear();
    router.push('/');
  };

  useEffect(() => {
    if (Object.keys(thankYouLogoutResponse).length) {
      if (thankYouLogoutResponse?.MessageId) {
        logout();
      }
    }
  }, [thankYouLogoutResponse]);

  const handleSubmit = () => {
    router.push('/preferences');
    // const emailId = getFromLocalStorage(STORAGE.EMAIL_ID);

    // if (validEmailIds.includes(emailId)) {
    //   removeLocalStorage(STORAGE.EMAIL_ID);
    //   router.push('/preferences');
    // } else {
    //   dispatch(thankyouLogout());
    // }
  };
  return (
    <>
      <Row className={`fullwidth ${styles.logo}`}>
        <Image className={styles.imgLogo} src={Logo.src} />
      </Row>
      <Row justify="center" align="middle" className={styles.thankyoupage}>
        <Row>
          <SuccessCard
            showButton
            title={AppConfig.getCMSMessage('register_brand.formSuccess.title')}
            subtitle={AppConfig.getCMSMessage('register_brand.formSuccess.subTitle')}
            buttonLable={AppConfig.getCMSMessage('register_brand.formSuccess.next_button')}
            handleSubmit={handleSubmit}
          />
        </Row>
      </Row>
    </>
  );
};

ThankYou.propTypes = {};

export default ThankYou;
