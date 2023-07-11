/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 6:58:04 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Row, Modal } from 'antd';
import Sdpopup from '@Components/storeDetails/sdpopup';
import styles from './StoreDetails.module.scss';
import Buttons from '@Atoms/button';
import { getCartAction, removeCartItemAction } from '@Store/register-cart/cartAction';
import Header from '@Atoms/header';

import { useRouter } from 'next/router';

const StoreDetails = () => {
  const router = useRouter();

  const [sdPopUp, setSdPopUp] = useState(false);
  const [sdPopUpData, setSdPopUpData] = useState(false);
  const [cartDataResponse, setCartDataResponse] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // get the API for the details based on the the region selected
    dispatch(getCartAction());
  }, []);

  const cartItemsLocal = useSelector((state) => state.cartSlice.getCartDetails);

  useEffect(() => {
    let lx = cartItemsLocal.items;
    setCartDataResponse(lx);
  }, [cartItemsLocal]);

  const openPopup = (item) => {
    setSdPopUpData(item);
    setSdPopUp(true);
  };

  const delItem = (item) => {
    dispatch(removeCartItemAction(item.orderId, item.id));
  };

  const handleOk = () => {
    setSdPopUp(false);
  };

  const handleCancel = () => {
    setSdPopUp(false);
  };

  const handleContinue = () => {
    router.push('/calendar');
  };

  const handleBack = () => {
    router.push('/preferences');
  };

  return (
    <>
      <Header title="Store Details" />

      <Modal
        title="Shop Details"
        open={sdPopUp}
        width={1200}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Sdpopup dataToDisplay={sdPopUpData} />
      </Modal>
      <div style={{ marginLeft: '5%', marginTop: '2%', bottom: '0px' }}>
        <div style={{ height: '100%' }}>
          <Row gutter={10}>
            {cartDataResponse && cartDataResponse.length > 0 ? (
              cartDataResponse.map((item) => {
                return (
                  <Col span={6} key={item.id}>
                    <Card
                      title={item.retailer.name}
                      extra={
                        <div>
                          <Button onClick={() => openPopup(item)}>View</Button>
                          <Button onClick={() => delItem(item)}>Delete</Button>
                        </div>
                      }
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                    >
                      <p>{item?.retailerSpace?.address}</p>
                      <p>{item?.retailer?.retailerType}</p>
                      <p>{item?.retailerSpace?.cost}</p>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div>No items in cart</div>
            )}
          </Row>
        </div>

        <Row
          className={`${styles.container} `}
          style={{ bottom: '0', position: 'fixed', width: '100%' }}
          justify="flex-end"
        >
          <Col md={12}>
            <Buttons
              size="small"
              action="submit"
              processingLabel="Please wait..."
              onClick={() => handleBack()}
            >
              Back
            </Buttons>
          </Col>
          <Col md={12} push={7}>
            <Buttons
              size="small"
              action="submit"
              processingLabel="Please wait..."
              onClick={() => handleContinue()}
            >
              Continue
            </Buttons>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StoreDetails;
