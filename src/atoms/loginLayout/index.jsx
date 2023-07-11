/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 08 2022 3:17:16 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { node, oneOfType, string } from 'prop-types';
import styles from './LoginLayout.module.scss';
import { Row, Col } from 'antd';
import Container from '@Atoms/container/Container';
import Image from '@Atoms/image/Image';
import Typography from '@Atoms/typography';
import Logo from '@Assets/images/okboys_logo.png';

const LoginLayout = ({ title, subtitle, backgroundimg, children }) => {
  return (
    <Row className={styles.loginlayout}>
      <Col md={12}>
        <Container>
          <Row className={styles.wrapper}>
            <Row className={`fullwidth ${styles.logo}`}>
              <Image className={styles.imgLogo} src={Logo.src} />
            </Row>
            <Row className={`fullwidth ${styles.container}`}>
              <Typography variant="h3">{title}</Typography>
              <Typography variant="p">{subtitle}</Typography>
            </Row>
            <Row className={`fullwidth ${styles.container}`}>{children}</Row>
          </Row>
        </Container>
      </Col>
      <Col md={12} className={styles.imgContainer}>
        <Image className={styles.img} src={backgroundimg} />
      </Col>
    </Row>
  );
};

LoginLayout.propTypes = {
  title: string,
  subtitle: string,
  backgroundimg: string,
  children: oneOfType([string, node]).isRequired,
};

LoginLayout.defaultProps = {
  title: '',
  subtitle: '',
  backgroundimg: '',
};

export default LoginLayout;
