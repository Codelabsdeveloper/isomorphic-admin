/*
 * File: index.jsx
 * Project: Shoprsmart
 * Created Date: Fri Nov 04 2022 10:17:34 AM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Audit.module.scss';
import Typography from '@Atoms/typography';
import { API_ORDER_STATUS } from '@Constants/constants';
import { getHistoryOrdersAction } from '@Store/dashboard/history/historyAction';
import CampaignAudit from './campaign-audit';

const Audit = () => {
  const dispatch = useDispatch();
  const [activeCamp, setActiveCamp] = useState('');

  const { displayLoader, historyOrdersData } = useSelector((state) => state.historySlice);

  useEffect(() => {
    dispatch(getHistoryOrdersAction(API_ORDER_STATUS.done));
  }, []);

  const handleMenuItemSelect = (menuItem) => {
    if (menuItem?.key === activeCamp) setActiveCamp('');
    else setActiveCamp(menuItem?.key);
  };

  const selectedCampaign = (activeCamp) => {
    return historyOrdersData.find((item) => parseInt(item.id) === parseInt(activeCamp));
  };

  return (
    <>
      <Row className={styles.mainContainer}>
        <Col span={24}>
          <Typography variant="h4">Audit</Typography>
        </Col>

        {displayLoader ? (
          <Col span={24}>
            <Skeleton active />
          </Col>
        ) : historyOrdersData?.length > 0 ? (
          <>
            <Col span={6}>
              <Menu
                mode="vertical"
                selectedKeys={activeCamp}
                onClick={(menuItem) => handleMenuItemSelect(menuItem)}
              >
                {historyOrdersData.map((item) => {
                  return <Menu.Item key={item?.id}>{item?.campaignDetails[0]?.name}</Menu.Item>;
                })}
              </Menu>
            </Col>
            <Col span={18}>
              <CampaignAudit campaign={selectedCampaign(activeCamp)} />
            </Col>
          </>
        ) : (
          <Col span={24}>No Data Available</Col>
        )}
      </Row>
    </>
  );
};

export default Audit;
