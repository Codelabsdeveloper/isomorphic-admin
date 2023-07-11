/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 08 2022 4:48:36 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 5:46:00 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useEffect, useRef } from 'react';
import styles from './OtpInput.module.scss';
import { func, object } from 'prop-types';

const OtpInput = ({ setOtpValue, otpValue }) => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);

  useEffect(() => {
    firstRef?.current?.focus();
  }, []);

  const handleKeyDown = (event, type) => {
    let allRefs = [firstRef, secondRef, thirdRef, fourthRef];
    if (event.key === 'Backspace') {
      if (allRefs.indexOf(type) !== -1) {
        setTimeout(() => {
          allRefs[allRefs.indexOf(type) - 1]?.current?.focus();
        }, 100);
      }
    } else if (event.keyCode > 47 && event.keyCode < 58) {
      setTimeout(() => {
        allRefs[allRefs.indexOf(type) + 1]?.current?.focus();
      }, 100);
    }
  };

  const handleInputChange = (event, type) => {
    let value = event.target.value;
    setOtpValue({ ...otpValue, [type]: value });
  };

  return (
    <div className={styles.otpinput}>
      <input
        className={styles.formcontrol}
        onChange={(e) => handleInputChange(e, 'firstRef')}
        onKeyDownCapture={(e) => handleKeyDown(e, firstRef)}
        type="text"
        ref={firstRef}
        maxLength="1"
      />
      <input
        className={styles.formcontrol}
        onChange={(e) => handleInputChange(e, 'secondRef')}
        onKeyDownCapture={(e) => handleKeyDown(e, secondRef)}
        type="text"
        ref={secondRef}
        maxLength="1"
      />
      <input
        className={styles.formcontrol}
        onChange={(e) => handleInputChange(e, 'thirdRef')}
        onKeyDownCapture={(e) => handleKeyDown(e, thirdRef)}
        type="text"
        ref={thirdRef}
        maxLength="1"
      />
      <input
        className={styles.formcontrol}
        onChange={(e) => handleInputChange(e, 'fourthRef')}
        onKeyDownCapture={(e) => handleKeyDown(e, fourthRef)}
        type="text"
        ref={fourthRef}
        maxLength="1"
      />
    </div>
  );
};

OtpInput.propTypes = {
  setOtpValue: func.isRequired,
  otpValue: object.isRequired,
};

export default OtpInput;
