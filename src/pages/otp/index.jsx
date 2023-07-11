/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 08 2022 3:38:04 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 8:52:17 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import AppConfig from '@App/appConfig/AppConfig';
// import styles from './Otp.module.scss';
import { Row, Alert } from 'antd';
import Button from '@Atoms/button';
import LoginLayout from '@Atoms/loginLayout';
import OtpInput from '@Components/otpInput';
import SwiggyImage from '@Assets/images/swiggy-mockup.jpeg';
import { encryptOTP } from '@Utils/Encryption';
import { handleProctedPage } from '@Store/protectedSlice';
import { setToLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';

// Actions Import
import { validateOtpAction } from '@Store/login-store/loginAction';

const OTP = () => {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  const [otpValue, setOtpValue] = useState({});

  const { otpBtnLoading, optResponse, otpError } = useSelector((state) => state.loginSlice);
  const { isProtectedPage } = useSelector((state) => state.protectedSlice);

  useEffect(() => {
    if (isProtectedPage) {
      const { isBrandDetailsAvailable } = optResponse;
      isBrandDetailsAvailable ? router.push('/preferences') : router.push('/register-brand');
    }
  }, [isProtectedPage]);

  useEffect(() => {
    if (optResponse && Object.keys(optResponse).length) {
      setToLocalStorage(STORAGE.EMAIL_ID, optResponse.email);
      dispatch(handleProctedPage());
    }
  }, [optResponse]);

  const handleOnSubmit = () => {
    const digest = encryptOTP(parseInt(Object.values(otpValue).join('')));
    const appType = AppConfig.getCMSMessage('app_type');
    const payload = { digest, id: query.id, appType, fcmId: '' };

    dispatch(validateOtpAction(payload));
  };

  return (
    <LoginLayout
      title={AppConfig.getCMSMessage('otp.title')}
      subtitle={AppConfig.getCMSMessage('otp.subTitle')}
      backgroundimg={SwiggyImage.src}
    >
      <>
        {/* <Row style={{ border: '1px solid blue' }}> */}
        <Row justify="start">
          <OtpInput setOtpValue={setOtpValue} otpValue={otpValue} />
        </Row>
        <br />
        <Row justify="start">
          <Button
            size="small"
            onClick={handleOnSubmit}
            action="submit"
            isProcessing={otpBtnLoading}
            processingLabel=""
          >
            {AppConfig.getCMSMessage('otp.otp_button')}
          </Button>
        </Row>
        <br />
        {otpError && (
          <Row justify="start">
            <Alert message="Error" description={otpError} type="error" showIcon />
          </Row>
        )}
        {/* </Row> */}
      </>
    </LoginLayout>
  );
};

export default OTP;
