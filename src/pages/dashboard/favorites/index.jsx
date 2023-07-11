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

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@Atoms/typography';
import styles from './Favorites.module.scss';
import { getCurrentOrdersAction } from '@Store/dashboard/current-orders/currentOrderAction';
import CartTable from '@Components/cartTable';

const Favorites = () => {
  const dispatch = useDispatch();

  const [favOrders, setFavOrders] = useState([]);
  const { displayLoader, currentOrdersData } = useSelector((state) => state.currentOrderSlice);

  useEffect(() => {
    let filteredFavOrders = [];
    if (currentOrdersData.length > 0)
      filteredFavOrders = currentOrdersData.filter((item) => item?.isFavourite === true);
    setFavOrders(filteredFavOrders);
  }, [currentOrdersData]);

  useEffect(() => {
    dispatch(getCurrentOrdersAction());
  }, []);

  const totalPriceCalculate = (items) => {
    return items.reduce((accumulator, object) => {
      return accumulator + object.cost;
    }, 0);
  };

  return (
    <>
      <Row className={styles.mainContainer}>
        <Typography variant="h4">Favorites</Typography>

        {displayLoader ? (
          <Col span={24}>
            <Skeleton active />
          </Col>
        ) : favOrders?.length > 0 ? (
          favOrders.map(
            (item, index) =>
              item?.isFavourite && (
                <Col span={24} key={index} className={styles.cards}>
                  <Card title={item?.campaignDetails[0]?.name}>
                    <Row justify="space-between">
                      <Col>
                        Active : <strong>{item.active.toString()}</strong>
                        <br />
                        Created By : <strong>{item.createdBy}</strong>
                        <br />
                        Created Ts : <strong>{item.createdTs}</strong>
                        <br />
                        ID : <strong>{item.id}</strong>
                        <br />
                        Order Number : <strong>{item.orderNumber}</strong> <br />
                        Status : <strong>{item.status}</strong>
                        <br />
                        UserID : <strong>{item.userId}</strong> <br />
                        <br />
                      </Col>
                    </Row>
                    <Row>
                      <CartTable
                        cartDetails={item?.items}
                        totalPrice={totalPriceCalculate(item?.items)}
                      />
                    </Row>
                  </Card>
                </Col>
              )
          )
        ) : (
          <Col span={24}>No Data Available</Col>
        )}
      </Row>
    </>
  );
};

export default Favorites;
