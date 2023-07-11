/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sat Sep 10 2022 12:10:50 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Checkbox, notification } from 'antd';
import styles from '@Styles/Cart.module.scss';
import Card from '@Components/card';
import CartTable from '@Components/cartTable';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';
import {
  getCartAction,
  confirmCartDetailsAction,
  saveCampignAction,
} from '@Store/register-cart/cartAction';
import Header from '@Atoms/header';
import FooterTimeline from '@Atoms/footerTimeline';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [overallTotalCost, setOverallTotalCost] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  // const [totalGst] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [printCost, setPrintCost] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [campName, setCampName] = useState('');
  const [cartId, setCartId] = useState('');
  const [campaignCheckboxVal, setCampaignCheckboxVal] = useState(false);
  useEffect(() => {
    // get the API for the details based on the the region selected
    dispatch(getCartAction());
  }, []);

  const cartDetailsProps = useSelector((state) => state?.cartSlice?.getCartDetails);
  const confirmCartDetails = useSelector((state) => state?.cartSlice?.confirmCartDetails);
  const saveCampaignDetailsLocal = useSelector((state) => state?.cartSlice?.saveCampaignDetails);

  useEffect(() => {
    if (cartDetailsProps && cartDetailsProps.items) {
      if (cartDetailsProps.campaignDetails && cartDetailsProps.campaignDetails.length > 0) {
        setCampName(cartDetailsProps.campaignDetails[0].name);
      }

      setCartId(cartDetailsProps.id);
      setCartData(cartDetailsProps.items);
      setTotalStores(cartDetailsProps.items.length);
      const t = cartDetailsProps.items.reduce((accumulator, object) => {
        return accumulator + object.cost;
      }, 0);

      const printCost = cartDetailsProps.items.reduce((accumulator, object) => {
        const myArray = object?.retailerSpace?.dimension?.split('x');

        let dimensionMult = myArray[0] * myArray[1] * 50;
        return accumulator + dimensionMult;
      }, 0);

      setPrintCost(printCost);

      setTotalCost(t);
      setOverallTotalCost(t);

      setTotalDays(
        cartDetailsProps.items.reduce((accumulator, object) => {
          var date1 = new Date(object.scheduleDateStart);
          var date2 = new Date(object.scheduleDateEnd);

          // To calculate the time difference of two dates
          var Difference_In_Time = date2.getTime() - date1.getTime();

          // To calculate the no. of days between two dates
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          return accumulator + Difference_In_Days;
        }, 0)
      );
    }
  }, [cartDetailsProps]);

  useEffect(() => {
    if (confirmCartDetails && Object.keys(confirmCartDetails).length) {
      router.push('/confirm-cart');
    }
  }, [confirmCartDetails]);

  // eslint-disable-next-line no-unused-vars
  const onSaveChange = (val) => {
    setCampaignCheckboxVal(val.target.checked);
    let payload = {
      isFavourite: val.target.checked,
      cartId: cartId,
    };
    dispatch(saveCampignAction(payload));
  };

  useEffect(() => {
    let msg = campaignCheckboxVal
      ? 'Campaign added to favourites'
      : 'Campaign removed from favourites';
    if (saveCampaignDetailsLocal && saveCampaignDetailsLocal == '2000') {
      notification['success']({
        message: 'Success',
        description: msg,
      });
    }
  }, [saveCampaignDetailsLocal]);

  return (
    <>
      <Header title="Cart Details" />

      <Row className={styles.cart}>
        <Row className={styles.container} gutter={15}>
          <Col md={18}>
            <CartTable
              cartDetails={cartData}
              totalPrice={overallTotalCost}
              // handleRemove={handleRemove}
              // showRemove
            />
          </Col>
          {!confirm && (
            <Col md={6}>
              <Card className={styles.card}>
                <Row className={styles.wrapper}>
                  <Col md={12}>
                    <Typography variant="p">
                      {AppConfig.getCMSMessage('cart.card.total_days')}
                    </Typography>
                  </Col>
                  <Col md={12} className={styles.alignright}>
                    <Typography variant="p"> {totalDays}</Typography>
                  </Col>
                </Row>
                <Row className={styles.wrapper}>
                  <Col md={12}>
                    <Typography variant="p">
                      {AppConfig.getCMSMessage('cart.card.total_stores')}
                    </Typography>
                  </Col>
                  <Col md={12}>
                    <Typography variant="p" className={styles.alignright}>
                      {totalStores}
                    </Typography>
                  </Col>
                </Row>
                {/* <Row className={styles.wrapper}>
                  <Col md={12}>
                    <Typography variant="p">
                      {AppConfig.getCMSMessage('cart.card.total_gst')}
                    </Typography>
                  </Col>
                  <Col md={12}>
                    <Typography variant="p" className={styles.alignright}>
                      ₹ {totalGst}
                    </Typography>
                  </Col>
                </Row> */}
                <Row className={styles.wrapper}>
                  <Col md={12} className={styles.grandTotal}>
                    <Typography variant="p">
                      {AppConfig.getCMSMessage('cart.card.total_cost')}
                    </Typography>
                  </Col>
                  <Col md={12} className={styles.grandTotal}>
                    <Typography variant="p" className={styles.alignright}>
                      ₹ {totalCost + totalCost * 0.18}
                    </Typography>
                  </Col>
                </Row>
              </Card>

              <Row>
                <Col md={24}>
                  <h3>Campaign Name : {campName} </h3>
                </Col>
              </Row>

              <Row className={styles.continueBtn}>
                <Col md={24}>
                  <Button
                    size="small"
                    onClick={() => setConfirm(true)}
                    processingLabel="Please wait..."
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
          {confirm && (
            <Col md={6}>
              <Card className={styles.card}>
                <Row className={styles.wrapper}>
                  <Col md={24}>
                    <Typography variant="p" className={styles.grandTotal}>
                      {AppConfig.getCMSMessage('cart.card.summary')}
                    </Typography>
                  </Col>
                </Row>
                <Row className={styles.wrapper}>
                  <Col md={24}>
                    <Typography variant="p">
                      Cost for {totalStores} shop : ₹ {overallTotalCost + overallTotalCost * 0.18}
                    </Typography>
                  </Col>
                </Row>
                <Row className={styles.wrapper}>
                  <Col md={24}>
                    <Typography variant="p">
                      Branding & Print Cost : ₹ {printCost}
                      <sup>(Dimension*50)</sup>
                    </Typography>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={24}>
                    <h3>Campaign Name : {campName} </h3>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={24}>
                    <Checkbox onChange={onSaveChange}>Add to favourite</Checkbox>
                  </Col>
                </Row>
                <hr />
                <Row className={styles.wrapper}>
                  <Col md={24}>
                    <Typography variant="p" className={styles.grandTotal}>
                      Grand Total : ₹ {overallTotalCost + overallTotalCost * 0.18 + printCost}
                    </Typography>
                  </Col>
                </Row>
              </Card>
              <Row className={styles.continueBtn}>
                <Col md={24}>
                  <Button
                    size="small"
                    onClick={() => dispatch(confirmCartDetailsAction(cartId, {}))}
                    processingLabel="Please wait..."
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        <Row className={styles.timelinefooter}>
          <FooterTimeline active="Cart" noContinue />
        </Row>
      </Row>
    </>
  );
};

export default Cart;
