/*
 * File: ErrorBoundary.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 8:03:38 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import Stetching from '@Assets/images/stetching.jpeg';
import Link from 'next/link';
import Image from '@Atoms/image/Image';
import logger from '@Utils/Logger';
import { any } from 'prop-types';
import { Component } from 'react';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      info: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    logger.error(info?.componentStack);
    this.setState({ info: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div className={styles.errorBoundary}>
            <div className={styles.errorBoundaryDesc}>HMMM, THAT PAGE IS NOT LOADING.</div>
            <div className={styles.subText}>
              <div>It must have gone for a run.</div>
              <div>
                Take a second to stand up and stretch, then try a
                <Link href="/" onClick={() => window?.location?.reload()}>
                  reloading
                </Link>
                after.
              </div>
            </div>
            <br />
            <Image src={Stetching.src} alt="error-boundary" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

//Props validation
ErrorBoundary.propTypes = {
  children: any,
};

export default ErrorBoundary;
