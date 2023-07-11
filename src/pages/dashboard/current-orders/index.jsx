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
import { Row, Col, Card, Skeleton, Steps, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import Icon from '@Atoms/icon/Icon';
import Typography from '@Atoms/typography';
import styles from './CurrentOrders.module.scss';
// import dynamic from 'next/dynamic';
import { getCurrentOrdersAction } from '@Store/dashboard/current-orders/currentOrderAction';
import { handleDisplayLoader } from '@Store/dashboard/current-orders/currentOrderSlice';
import {
  handleIsUploadModalOpen,
  handleCurrentOrderForUpload,
} from '@Store/dashboard/creative-work/creativeWorkSlice';
import { ORDER_STATUS, API_ORDER_STATUS } from '@Constants/constants';
import Button from '@Atoms/button';
import CreativeWork from './creative-work';
// import CartTable from '@Components/cartTable';

// const DashboardLayout = dynamic(() => import('@Atoms/dashboardLayout'), { ssr: false });

const { Step } = Steps;

const CurrentOrders = () => {
  const dispatch = useDispatch();

  const { displayLoader, currentOrdersData } = useSelector((state) => state.currentOrderSlice);
  const { isUploadModalOpen } = useSelector((state) => state.creativeWorkSlice);

  useEffect(() => {
    dispatch(handleDisplayLoader(true));
    dispatch(getCurrentOrdersAction(API_ORDER_STATUS.current));
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

  const handleCreativeWorkModalOpen = (currentOrderForUpload) => {
    dispatch(handleCurrentOrderForUpload(currentOrderForUpload));
    dispatch(handleIsUploadModalOpen(true));
  };

  const handleCreativeWorkModalClose = () => {
    dispatch(handleCurrentOrderForUpload({}));
    dispatch(handleIsUploadModalOpen(false));
  };

  // const totalPriceCalculate = (items) => {
  //   return items.reduce((accumulator, object) => {
  //     return accumulator + object.cost;
  //   }, 0);
  // };

  return (
    // <DashboardLayout>
    <>
      <Modal
        title="Upload Creative Work"
        width="70%"
        open={isUploadModalOpen}
        footer={null}
        centered
        onCancel={() => handleCreativeWorkModalClose()}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
      >
        <CreativeWork />
      </Modal>
      <Row className={styles.mainContainer}>
        <Typography variant="h4">Current Order Details</Typography>

        {displayLoader ? (
          <Col span={24}>
            <Skeleton active />
          </Col>
        ) : currentOrdersData?.length > 0 ? (
          currentOrdersData.map((item, index) => (
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
                  {item.status === ORDER_STATUS.orderPlaced.status && (
                    <Col>
                      <Button size="small" onClick={() => handleCreativeWorkModalOpen(item)}>
                        Upload Creative Work
                      </Button>
                    </Col>
                  )}
                </Row>
                {/* <Row>
                  <CartTable
                    cartDetails={item?.items}
                    totalPrice={totalPriceCalculate(item?.items)}
                  />
                </Row> */}
                <Row>
                  <strong>Order Status:</strong> <br />
                  <br />
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
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>No Data Available</Col>
        )}
      </Row>
    </>
    // </DashboardLayout>
  );
};

export default CurrentOrders;
