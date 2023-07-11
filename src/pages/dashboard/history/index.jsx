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

import React, { useEffect } from 'react';
import { Row, Col, Card, Skeleton, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@Atoms/typography';
import styles from './History.module.scss';
import {
  downloadInvoiceAction,
  getHistoryOrdersAction,
} from '@Store/dashboard/history/historyAction';
import { handleDisplayLoader } from '@Store/dashboard/history/historySlice';
import { ORDER_STATUS, API_ORDER_STATUS } from '@Constants/constants';
import Button from '@Atoms/button';

const { Step } = Steps;

const History = () => {
  const dispatch = useDispatch();

  const { displayLoader, historyOrdersData } = useSelector((state) => state.historySlice);

  useEffect(() => {
    dispatch(handleDisplayLoader(true));
    dispatch(getHistoryOrdersAction(API_ORDER_STATUS.done));
  }, []);

  const getCurrentStatusNumber = (status) => {
    if (status === ORDER_STATUS.created.status) return ORDER_STATUS.created.stepNo;
    else if (status === ORDER_STATUS.orderPlaced.status) return ORDER_STATUS.orderPlaced.stepNo;
    else if (status === ORDER_STATUS.createUploaded.status)
      return ORDER_STATUS.createUploaded.stepNo;
    else if (status === ORDER_STATUS.printing.status) return ORDER_STATUS.printing.stepNo;
    else if (status === ORDER_STATUS.installationProcess.status)
      return ORDER_STATUS.installationProcess.stepNo;
    else if (status === ORDER_STATUS.done.status) return ORDER_STATUS.done.stepNo;
  };

  const downloadInvoice = (orderId) => {
    dispatch(downloadInvoiceAction(orderId));
  };

  return (
    <Row className={styles.mainContainer}>
      <Typography variant="h4">History</Typography>
      <Col span={24}>
        {displayLoader ? (
          <Col span={24}>
            <Skeleton active />
          </Col>
        ) : historyOrdersData?.length > 0 ? (
          historyOrdersData.map((item, index) => (
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
                    <strong>Order Status:</strong> <br />
                    <br />
                  </Col>
                  <Col>
                    <Button size="small" onClick={() => downloadInvoice(item.id)}>
                      Download Invoice
                    </Button>
                  </Col>
                </Row>
                <Steps
                  current={getCurrentStatusNumber(item.status)}
                  labelPlacement="vertical"
                  status={item.status === ORDER_STATUS.cancelled.status ? 'error' : 'wait'}
                >
                  <Step title="Order Placed" description="" />
                  <Step title="Creatives Uploaded" description="" />
                  <Step title="Printing" description="" />
                  <Step title="Installation Progress" description="" />
                  <Step title="Done" description="" />
                </Steps>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>No Data Available</Col>
        )}
      </Col>
    </Row>
  );
};

export default History;
