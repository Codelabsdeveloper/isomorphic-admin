/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 25 2022 2:12:14 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import OverlayVideoPlayer from '@Components/overlayVideoPlayer';
import LoginLayout from '@Atoms/loginLayout';
import SwiggyImage from '@Assets/images/okboy-scooter.png';
import Image from '@Atoms/image/Image';
import styles from '@Styles/Login.module.scss';
import DashedContent from '@Atoms/dashedContent';
import Button from '@Atoms/button';
import { Row, Alert, Spin } from 'antd';
import AntdInput from '@Atoms/AntdInput';
import { email, phoneNumber } from '@Helpers/FieldValidator';
import { userLoginAction } from '@Store/login-store/loginAction';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import GoogleImage from '@Assets/images/google-icon.png';
import axios from 'axios';
import {
  handleGoogleLoginData,
  handleGoogleLoginError,
  handleLoginError,
} from '@Store/login-store/loginSlice';

// ENV variables import
import { GOOGLE_USER_INFO_API } from '../../env.config.js';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showOverlay, setOverlay] = useState(false);
  const [values, setValues] = useState({ emailId: '', mobileNumber: '' });
  const [emailError, setEmailError] = useState(false);
  const [mobileNumberError, setPhoneNumberError] = useState(false);
  const [loader, setLoader] = useState(true);

  const isLoggedIn = useSelector((state) => state.loginSlice.loggedUserDetails);
  const { googleLoginData, loginError, loginBtnLoading } = useSelector((state) => state.loginSlice);

  useEffect(() => {
    if (
      getFromLocalStorage(STORAGE.AUTH) &&
      Object?.keys(getFromLocalStorage(STORAGE.AUTH))?.length
    ) {
      let dt = getFromLocalStorage(STORAGE.AUTH);
      if (!dt.brandDetails) {
        router.push('/register-brand');
      } else {
        if (dt.brandDetails.region.length === 0) {
          router.push('/register-brand/audience-goals');
        } else {
          router.push('/preferences');
        }
      }
    } else {
      router.push('/');
    }
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const { message, id } = isLoggedIn;
      if (message === 'OTP Generated successfully' && id) {
        router.push(`/otp?id=${id}`);
      }
    }
  }, [isLoggedIn]);

  const handleSkipVideo = () => {
    setOverlay(false);
  };

  const onChangeInput = (event, type) => {
    setValues({ ...values, [type]: event.target.value });
  };

  const handleLogin = () => {
    if (emailError || mobileNumberError) return;
    const payload = {
      ...values,
      emailId: Object.keys(googleLoginData).length > 0 ? googleLoginData?.email : values?.emailId,
      appType: AppConfig.getCMSMessage('app_type'),
    };
    dispatch(userLoginAction(payload));
  };

  const handleEmailBlur = () => {
    !email(values.emailId) ? setEmailError(true) : setEmailError(false);
  };

  const handleMobileNumberBlur = () => {
    !phoneNumber(values.mobileNumber) ? setPhoneNumberError(true) : setPhoneNumberError(false);
  };

  /**
   * useGoogleOneTapLogin - Google One Tap Login Handler
   * We receive the response as a credential JWT. We have to decode to get the user data.
   */
  useGoogleOneTapLogin({
    onSuccess: (response) => {
      const googleResponse = jwtDecode(response?.credential);
      dispatch(handleGoogleLoginData(googleResponse));
      setEmailError(false);
      dispatch(handleLoginError(''));
    },
    onError: (error) => {
      dispatch(handleGoogleLoginError(error?.message));
    },
    cancel_on_tap_outside: false,
  });

  /**
   * handleGoogleSubmit - Google Login Button Handler
   * We receive access_token, need to call the Google APIs to get the user info from the access_token.
   */
  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: async (response) => {
      await axios
        .get(GOOGLE_USER_INFO_API, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        })
        .then((res) => {
          dispatch(handleGoogleLoginData(res.data));
          setEmailError(false);
          dispatch(handleLoginError(''));
        })
        .catch((error) => {
          dispatch(handleGoogleLoginError(error?.message));
        });
    },
    // eslint-disable-next-line no-console
    onError: (error) => dispatch(handleGoogleLoginError(error?.message)),
  });

  return (
    <>
      <Head>
        <title>Admin - OK Boys</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loader && <Spin />}
      {showOverlay && !loader && <OverlayVideoPlayer handleSkipVideo={handleSkipVideo} />}
      {!loader && (
        <LoginLayout
          title={AppConfig.getCMSMessage('login.title')}
          subtitle={AppConfig.getCMSMessage('login.subTitle')}
          backgroundimg={SwiggyImage.src}
        >
          <Row gutter={2} className={styles.login}>
           
            <Row>
              <AntdInput
                required
                label="Mobile Number"
                size="large"
                errorMgs={mobileNumberError ? '*Please enter a valid mobile number' : ''}
                onChange={(e) => onChangeInput(e, 'mobileNumber')}
                value={values.mobileNumber}
                onBlur={handleMobileNumberBlur}
              />
            </Row>
            <Row className={styles.formfield}>
              <AntdInput
                required
                label="OTP"
                size="large"
                // errorMgs={emailError ? '*Please enter otp' : ''}
                onChange={(e) => onChangeOTP(e, 'otp')}
                // value={googleLoginData?.email || values?.emailId}
                // disabled={googleLoginData?.email}
                // onBlur={handleEmailBlur}
              />
            </Row>
            <Row justify="end">
              <Button
                size="small"
                onClick={handleLogin}
                action="submit"
                isProcessing={loginBtnLoading}
                processingLabel=""
              >
                {AppConfig.getCMSMessage('login.login_button')}
              </Button>
            </Row>
            {loginError && (
              <Row justify="center">
                <Alert message="Error" description={loginError} type="error" showIcon />
              </Row>
            )}
            <Row justify="center" className={styles.loginContainer}>
              <DashedContent label="OR" />
            </Row>
            <Row justify="center">
              <Button
                size="small"
                onClick={() => handleGoogleSubmit()}
                action="button"
                theme="primary-light"
              >
                <Image src={GoogleImage.src} alt="logo" width="24" height="24" />
                &nbsp; {AppConfig.getCMSMessage('login.google_button')}
              </Button>
            </Row>
          </Row>
        </LoginLayout>
      )}
    </>
  );
};

export default Login;
