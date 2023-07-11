/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Oct 16 2022 11:35:00 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import styles from './Header.module.scss';
import Image from '@Atoms/image/Image';
import Typography from '@Atoms/typography';
import Logo from '@Assets/images/logo.png';
import { FaHome } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';
import { handleLogoutAction } from '@Store/login-store/loginAction';
import { GoDashboard } from 'react-icons/go';

const Header = ({ title }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!getFromLocalStorage(STORAGE.AUTH)) {
      router.push('/');
    }
  }, []);

  const gotoHome = () => {
    router.push('/preferences');
  };

  const gotoDashboard = () => {
    router.push('/dashboard');
  };

  const logout = () => {
    dispatch(handleLogoutAction());
    window.localStorage.clear();
    router.push('/');
  };

  return (
    <Row className={styles.header}>
      <Col md={3} className={styles.logocontainer}>
        <Image className={styles.imgLogo} src={Logo.src} />
      </Col>
      <Col md={21} className={styles.headercontainer}>
        <Row className={styles.icons}>
          <span onClick={() => gotoDashboard()}>
            <GoDashboard /> <span className={styles.text}>Dashboard</span>
          </span>
          <span onClick={() => gotoHome()}>
            <FaHome /> <span className={styles.text}>Home</span>
          </span>
          <span onClick={() => logout()}>
            <AiOutlineLogout /> <span className={styles.text}>Logout</span>
          </span>
        </Row>
        <Row className={styles.title}>
          <Typography variant="h3">{title}</Typography>
        </Row>
      </Col>
    </Row>
  );
};

Header.propTypes = {
  title: string,
};

export default Header;
