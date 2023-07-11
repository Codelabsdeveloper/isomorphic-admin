/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/*
 * File: list.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 11:33:16 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import React, { useState, useEffect } from 'react';
import { string, bool } from 'prop-types';
import { Row, Col } from 'antd';
import Typography from '@Atoms/typography';
import styles from './CardList.module.scss';
import Icon from '@Atoms/icon/Icon';
import moment from 'moment';

const ListItem = ({ storeName, isActive, selDateRangeCardProps }) => {
  const [startDateLocal, setStartDateLocal] = useState(Date());
  const [endDateLocal, setEndDateLocal] = useState(Date());
  const [noOfDays, setNoOfDays] = useState();
  const [rPd, setRPD] = useState();

  useEffect(() => {
    let x = selDateRangeCardProps.selection2;
    if (x) {
      let xs = x?.startDate;
      let xe = x?.endDate;
      let beginDate = moment(xs).format('DD MM YYYY');
      let endDate = moment(xe).format('DD MM YYYY');
      setStartDateLocal(moment(xs).format('DD MM YYYY'));
      setEndDateLocal(moment(xe).format('DD MM YYYY'));
      console.log('beginDate  ', beginDate);
      console.log('enddate  ', endDate);
      if (beginDate && endDate) {
        var startDatez = moment(beginDate, 'DD MM YYYY');
        var endDatez = moment(endDate, 'DD MM YYYY');

        var result = endDatez.diff(startDatez, 'days');
        console.log('result', result);
        setNoOfDays(result);
        let cost = result * 10;
        setRPD(cost);
      }
    }
  }, [selDateRangeCardProps]);

  return (
    <Row className={[isActive ? styles.active : styles.list]}>
      <Row className={styles.container}>
        <Row className={styles.list}>
          <Row
            className={[styles.header, isActive ? styles.active : ''].join(' ').trim()}
            align="middle"
            justify="center"
          >
            <Col md={3} className={styles.icon}>
              <Icon iconName={isActive ? 'shop_white' : 'shop_grey'} className={styles.icon} />
            </Col>
            <Col md={21}>
              <Typography variant="h5" className={[isActive ? styles.active : styles.title]}>
                {storeName}
              </Typography>
            </Col>
          </Row>
          <Row className={[isActive ? styles.active : styles.wrapper]}>
            <Row className={styles.body}>
              <Row className={styles.wrapper}>
                <Col md={16}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {AppConfig.getCMSMessage('shedule_campaign.left_nav.scheduled_quantity')}
                  </Typography>
                </Col>
                <Col md={8} className={styles.alignright}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {noOfDays}
                  </Typography>
                </Col>
              </Row>
              <Row className={styles.listContainerListBodyWrapper}>
                <Col md={12}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {AppConfig.getCMSMessage('shedule_campaign.left_nav.scheduled_date')}
                  </Typography>
                </Col>
                <Col md={12} className={styles.alignright}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {startDateLocal} - {endDateLocal}
                  </Typography>
                </Col>
              </Row>
              <Row className={styles.listContainerListBodyWrapper}>
                <Col md={16}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {AppConfig.getCMSMessage('shedule_campaign.left_nav.rate')}
                  </Typography>
                </Col>

                <Col md={8} className={styles.alignright}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {rPd}
                  </Typography>
                </Col>
              </Row>
              <Row>{/* {props.selDateRangeCardProps} */}</Row>
            </Row>
            <Row className={styles.listContainerListFooter}>
              <Row className={styles.listContainerListFooterBodyWrapper} align="middle">
                <Col md={16}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {AppConfig.getCMSMessage('shedule_campaign.left_nav.sub_total')}
                  </Typography>
                </Col>
                <Col md={8} className={styles.alignright}>
                  <Typography
                    variant="h5"
                    className={[styles.title, styles.label].join(' ').trim()}
                  >
                    {rPd}
                  </Typography>
                </Col>
              </Row>
            </Row>
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

ListItem.propTypes = {
  storeName: '',
  isActive: false,
};

ListItem.defaultProps = {
  storeName: string,
  isActive: bool,
};

export default ListItem;
