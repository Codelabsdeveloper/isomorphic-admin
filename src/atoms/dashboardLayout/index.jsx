/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Sep 28 2022 3:05:43 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import Icon from '@Atoms/icon/Icon';
import Typography from '@Atoms/typography';
import styles from './DashboardLayout.module.scss';

import CreativeWork from 'src/pages/dashboard/current-orders/creative-work';
import CurrentOrders from 'src/pages/dashboard/current-orders';

const DASHBOARD_ITEMS = {
  creativeWork: {
    label: 'Creative Work',
    key: 'creativeWork',
    // icon: <FaRegLightbulb />,
    component: <CreativeWork />,
  },
  currentOrders: {
    label: 'Current Orders',
    key: 'currentOrders',
    // icon: <BsHandbag />,
    component: <CurrentOrders />,
  },
};

const DashboardLayout = () => {
  const dashboardItems = Object.values(DASHBOARD_ITEMS);

  const [activeMenu, setActiveMenu] = useState(DASHBOARD_ITEMS?.creativeWork?.key);

  const handleMenuItemSelect = (menuItem) => {
    setActiveMenu(menuItem?.key);
  };

  const contentRenderer = (activeMenu) => {
    if (activeMenu === DASHBOARD_ITEMS.creativeWork.key)
      return DASHBOARD_ITEMS.creativeWork.component;
    else if (activeMenu === DASHBOARD_ITEMS.currentOrders.key)
      return DASHBOARD_ITEMS.currentOrders.component;
  };

  return (
    <Row className={styles.creativework}>
      <Row className={styles.header}>
        <Col md={4}>
          <Icon className={styles.selectboxHeaderIcon} iconName="logo_medium" />
        </Col>
        <Col md={20} className={styles.headercontainer}>
          <Row className={styles.title}>
            <Typography variant="h3">Dashboard</Typography>
          </Row>
        </Col>
      </Row>
      <Row className={styles.body}>
        <Col span={4}>
          <Menu
            mode="vertical"
            items={dashboardItems}
            selectedKeys={activeMenu}
            onClick={(menuItem) => handleMenuItemSelect(menuItem)}
          />
        </Col>
        <Col span={19} className={styles.dashboardContent}>
          {contentRenderer(activeMenu)}
        </Col>
      </Row>
    </Row>
  );
};

export default DashboardLayout;
