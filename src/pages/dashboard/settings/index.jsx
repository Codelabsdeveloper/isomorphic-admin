/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Sep 28 2022 2:15:36 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Checkbox } from 'antd';
// import Icon from '@Atoms/icon/Icon';
import Typography from '@Atoms/typography';
import AntdInput from '@Atoms/AntdInput';
import { phoneNumber, upiValidator } from '@Helpers/FieldValidator';
import styles from './Settings.module.scss';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';
import { FiEdit } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateBrandDetailsAction } from '@Store/brand-register/brandAction';

const Settings = () => {
  const dispatch = useDispatch();

  const paymentRef = useRef(null);
  const alterMobileRef = useRef(null);
  const [upiError, setUpiError] = useState(false);
  const [mobileNumberError, setPhoneNumberError] = useState(false);

  const userDetails = getFromLocalStorage(STORAGE.AUTH);

  const [values, setValues] = useState({
    emailId: userDetails ? userDetails?.email : '',
    upi: userDetails?.brandDetails?.paymentValue ? userDetails?.brandDetails?.paymentValue : '',
    alternateNumber: userDetails?.brandDetails?.alterMobileNumber
      ? userDetails?.brandDetails?.alterMobileNumber.slice(3)
      : '',
  });
  const [paymentDisabled, setPaymentDisabled] = useState(
    userDetails?.brandDetails?.paymentValue ? true : false
  );
  const [alternateNumberDisabled, setAlternateNumberDisabled] = useState(
    userDetails?.brandDetails?.alterMobileNumber ? true : false
  );

  useEffect(() => {
    if (!userDetails?.brandDetails?.paymentValue || !userDetails?.brandDetails?.alterMobileNumber)
      return;
    if (!paymentDisabled) paymentRef.current.focus({ cursor: 'end' });
    if (!alternateNumberDisabled) alterMobileRef.current.focus({ cursor: 'end' });
  }, [paymentDisabled, alternateNumberDisabled]);

  const onChangeInput = (event, type) => {
    setValues({ ...values, [type]: event.target.value });
  };

  const handleMobileNumberBlur = () => {
    const isError = !phoneNumber(values.alternateNumber);
    const sameValueCheck =
      '+91' + values.alternateNumber === userDetails?.brandDetails?.alterMobileNumber
        ? true
        : false;

    if (!values.alternateNumber || isError) {
      setPhoneNumberError(true);
      return;
    } else if (sameValueCheck) {
      setAlternateNumberDisabled(true);
      return;
    } else {
      setPhoneNumberError(false);
      setAlternateNumberDisabled(true);
      const payload = {
        alterMobileNumber: '+91' + values?.alternateNumber,
      };
      dispatch(updateBrandDetailsAction(payload, userDetails?.brandDetails?.id));
    }
  };

  const handleUPIBlur = () => {
    const isError = !upiValidator(values.upi);
    const sameValueCheck = values.upi === userDetails?.brandDetails?.paymentValue ? true : false;

    if (!values.upi || isError) {
      setUpiError(true);
      return;
    } else if (sameValueCheck) {
      setPaymentDisabled(true);
      return;
    } else {
      setUpiError(false);
      setPaymentDisabled(true);
      const payload = {
        paymentValue: values?.upi,
      };
      dispatch(updateBrandDetailsAction(payload, userDetails?.brandDetails?.id));
    }
  };

  const paymentEdit = () => {
    setPaymentDisabled(false);
    // paymentRef.current.focus({ cursor: 'end' });
  };

  const alternateNumberEdit = () => {
    setAlternateNumberDisabled(false);
    // alterMobileRef.current.focus({ cursor: 'end' });
  };

  return (
    // <DashboardLayout>
    <>
      <Row className={styles.mainContainer}>
        <Typography variant="h4">Settings</Typography>
        <Col span={24} className={styles.dataStart}>
          <Row>
            <Col span={8}>
              <AntdInput label="Email" size="large" value={values.emailId} disabled={true} />
            </Col>
            <Col span={8} offset={2}>
              <AntdInput
                label="Current Phone Number"
                size="large"
                value={userDetails?.mobileNumber?.slice(3)}
                disabled={true}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <AntdInput
                label={
                  <>
                    Payment Method (UPI) &nbsp;
                    {(userDetails?.brandDetails?.paymentValue || paymentDisabled) && (
                      <span onClick={() => paymentEdit()} className={styles.editIcon}>
                        <FiEdit />
                      </span>
                    )}
                  </>
                }
                size="large"
                errorMgs={upiError ? '*Please enter a valid UPI Address' : ''}
                onChange={(e) => onChangeInput(e, 'upi')}
                value={values?.upi}
                placeholder="Enter new Payment Method"
                onBlur={handleUPIBlur}
                disabled={paymentDisabled}
                forwardRef={paymentRef}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <AntdInput
                label={
                  <>
                    Alternative number &nbsp;
                    {(userDetails?.brandDetails?.alterMobileNumber || alternateNumberDisabled) && (
                      <span onClick={() => alternateNumberEdit()} className={styles.editIcon}>
                        <FiEdit />
                      </span>
                    )}
                  </>
                }
                size="large"
                errorMgs={mobileNumberError ? '*Please enter a valid Mobile Number' : ''}
                onChange={(e) => onChangeInput(e, 'alternateNumber')}
                value={values?.alternateNumber}
                onBlur={handleMobileNumberBlur}
                placeholder="Enter alternate number"
                disabled={alternateNumberDisabled}
                forwardRef={alterMobileRef}
                // prefix="+91"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles.approvalContainer}>
        <Typography variant="h4">Approval Methods</Typography>
        <Col span={24} className={styles.checkboxes}>
          <Checkbox onChange={() => {}}>Receive SMS for Approval</Checkbox>
        </Col>
        <Col span={24} className={styles.checkboxes}>
          <Checkbox onChange={() => {}}>Receive Email for Approval</Checkbox>
        </Col>
        <Col span={24} className={styles.checkboxes}>
          <Checkbox onChange={() => {}}>Receive WhatsApp for Approval</Checkbox>
        </Col>
        <Col span={24} className={styles.checkboxes}>
          <Checkbox onChange={() => {}}>Auto Approvals</Checkbox>
        </Col>
      </Row>
    </>
    // </DashboardLayout>
  );
};

export default Settings;
