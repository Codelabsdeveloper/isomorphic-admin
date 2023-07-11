/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 9:10:00 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import React, { useEffect } from 'react';
import { number, string, bool, array } from 'prop-types';
import { Row } from 'antd';
import Typography from '@Atoms/typography';
import styles from './SelectableCard.module.scss';
import CardList from './CardList';

const SelectableCard = ({ totalValue, storeList, selDateRangeCardProps }) => {
  useEffect(() => {
    console.log('props select card', selDateRangeCardProps);
  }, [selDateRangeCardProps]);

  return (
    <Row className={styles.card}>
      <Row className={styles.container}>
        <Row className={styles.header}>
          <Typography variant="h5" className={styles.title}>
            {AppConfig.getCMSMessage('shedule_campaign.left_nav.total')}
          </Typography>
          <Typography variant="h5" className={styles.title}>
            {totalValue}
          </Typography>
          <Typography variant="h5" className={styles.title}>
            {AppConfig.getCMSMessage('shedule_campaign.left_nav.ads')}
          </Typography>
        </Row>
        {storeList?.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <CardList {...item} selDateRangeCardProps={selDateRangeCardProps} />
            </React.Fragment>
          );
        })}
      </Row>
    </Row>
  );
};

SelectableCard.propTypes = {
  totalValue: 0,
  storeName: '',

  isActive: false,
  storeList: [],
};

SelectableCard.defaultProps = {
  totalValue: number,
  storeName: string,
  isActive: bool,
  storeList: array,
};

export default SelectableCard;
