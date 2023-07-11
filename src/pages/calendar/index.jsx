/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Sep 28 2022 8:57:38 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import styles from '@Styles/Calendar.module.scss';
import { getCartAction } from '@Store/register-cart/cartAction';
import Calendar from '@Components/calendar';
import StoresList from '@Components/calendar/StoresList';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@Atoms/header';

function CalendarView() {
  const [selectedDateRangeParentProps, setSelectedDateRangeParentProps] = useState(Date());
  const dispatch = useDispatch();
  const [calDataResponse, setCalDataResponse] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [canShowContinue, setCanShowContinue] = useState(false);
  const callSetDate = (value) => {
    setSelectedDateRangeParentProps(value);
  };

  useEffect(() => {
    dispatch(getCartAction());
  }, []);

  const cartItemsLocalCal = useSelector((state) => state.cartSlice.getCartDetails);

  useEffect(() => {
    if (cartItemsLocalCal && cartItemsLocalCal.items) {
      let len = cartItemsLocalCal.items.length;
      if (len > 0) {
        let lx = cartItemsLocalCal.items;
        setCalDataResponse(lx);
      }

      if (cartItemsLocalCal.campaignDetails && cartItemsLocalCal.campaignDetails.length > 0) {
        setCampaignData(cartItemsLocalCal.campaignDetails[0]);
      }
    }
  }, [cartItemsLocalCal]);

  useEffect(() => {}, [calDataResponse]);

  const setPriceGlobal = (val) => {
    setCanShowContinue(val);
  };

  return (
    <>
      <Header title="Calendar" />
      <Row className={styles.calendar}>
        <Col md={5}>
          <Row className={styles.card}>
            <Row className={styles.header}>
              <StoresList
                storesList={calDataResponse}
                campaignDataProps={campaignData}
                selDateRangeCardProps={selectedDateRangeParentProps}
                setPriceGlobal={setPriceGlobal}
              />
            </Row>
          </Row>
        </Col>

        <Col md={19}>
          <Row className={styles.rightpanel}>
            <Col md={24}>
              <Calendar
                callSetDate={callSetDate}
                eventsData={calDataResponse}
                selectedDateRangeParentProps={selectedDateRangeParentProps}
                canShowContinue={canShowContinue}
              />
            </Col>
            <Col md={24} push={20}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CalendarView;
