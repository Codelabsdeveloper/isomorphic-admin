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

import { node, oneOfType, string } from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import styles from './DashboardLayout.module.scss';

// Components Import
import CurrentOrders from 'src/pages/dashboard/current-orders';
import History from 'src/pages/dashboard/history';
import Favorites from 'src/pages/dashboard/favorites';
import Reporting from 'src/pages/dashboard/reporting';
import Audit from 'src/pages/dashboard/audit';
import Finances from 'src/pages/dashboard/finances';
import Settings from 'src/pages/dashboard/settings';
import Header from '@Atoms/header';

// Icons Import
import { FaHistory } from 'react-icons/fa';
import { BsHandbag } from 'react-icons/bs';
import { TbReportSearch } from 'react-icons/tb';
import { AiOutlineStock, AiOutlineAudit } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const DASHBOARD_ITEMS = {
  currentOrders: {
    label: 'Current Orders',
    key: 'currentOrders',
    icon: <BsHandbag />,
    component: <CurrentOrders />,
  },
  history: {
    label: 'History',
    key: 'history',
    icon: <FaHistory />,
    component: <History />,
  },
  favorites: {
    label: 'Favorites',
    key: 'favorites',
    icon: <MdOutlineFavoriteBorder />,
    component: <Favorites />,
  },
  reporting: {
    label: 'Reporting',
    key: 'reporting',
    icon: <TbReportSearch />,
    component: <Reporting />,
  },
  audit: {
    label: 'Audit',
    key: 'audit',
    icon: <AiOutlineAudit />,
    component: <Audit />,
  },
  finances: {
    label: 'Finances',
    key: 'finances',
    icon: <AiOutlineStock />,
    component: <Finances />,
  },
  settings: {
    label: 'Settings',
    key: 'settings',
    icon: <FiSettings />,
    component: <Settings />,
  },
};

const DashboardLayout = () => {
  const dashboardItems = Object.values(DASHBOARD_ITEMS);

  const [activeMenu, setActiveMenu] = useState(DASHBOARD_ITEMS?.currentOrders?.key);

  const handleMenuItemSelect = (menuItem) => {
    setActiveMenu(menuItem?.key);
  };

  const contentRenderer = (activeMenu) => {
    const content = dashboardItems.filter((item) => {
      if (activeMenu === item.key) return item;
    });
    return content[0].component;
  };

  return (
    <Row className={styles.creativework}>
      <Header title="Dashboard" />
      <Row className={styles.body}>
        <Col span={4}>
          <Menu
            mode="vertical"
            selectedKeys={activeMenu}
            onClick={(menuItem) => handleMenuItemSelect(menuItem)}
          >
            {dashboardItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={20} className={styles.dashboardContent}>
          {contentRenderer(activeMenu)}
        </Col>
      </Row>
    </Row>
  );
};

DashboardLayout.propTypes = {
  children: oneOfType([string, node]).isRequired,
};

export default DashboardLayout;
