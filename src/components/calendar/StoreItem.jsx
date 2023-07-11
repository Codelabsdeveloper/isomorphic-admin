/*
 * File: StoreItem.jsx
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 29 2022 12:18:26 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { Row, Col, Checkbox } from 'antd';
import Icon from '@Atoms/icon/Icon';
import Typography from '@Atoms/typography';
import styles from './StoresList.module.scss';
import moment from 'moment';
import { array, object, func } from 'prop-types';

const StoreItem = ({ onSelectCard, markAllChecked, item }) => {
  const readDate = (date) => {
    return moment(date).format('DD MMM YYYY');
  };

  const getDays = (d1, d2) => {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let d;
    if (Difference_In_Days > 0) {
      d = Math.ceil(Difference_In_Days / 30);
    }
    return d;
  };

  return (
    <Row className={markAllChecked.includes(item.id) ? styles.active : ''}>
      <Row className={styles.headers}>
        <Col span={4}>
          <Icon
            className={styles.selectboxHeaderIcon}
            iconName={`shop_${markAllChecked.includes(item.id) ? 'white' : 'grey'}`}
          />
        </Col>
        <Col span={16}>
          <Typography variant="p">{item.name}</Typography>
        </Col>
        <Col span={4}>
          <Checkbox
            id={item.id}
            checked={markAllChecked.includes(item.id)}
            value={item.name}
            onChange={onSelectCard}
            className={styles.checkbox}
          />
        </Col>
      </Row>

      <Row className={styles.row}>
        <Col span={10}>
          <Typography variant="p">Scheduled Quantity</Typography>
        </Col>
        <Col span={14}>
          <Typography variant="p">1</Typography>
        </Col>
        <Col span={10}>
          <Typography variant="p">No of Months</Typography>
        </Col>
        <Col span={14}>
          <Typography variant="p">
            {item.startDate && item.endDate && getDays(item.startDate, item.endDate)}
          </Typography>
        </Col>
        <Col span={10}>
          <Typography variant="p">Scheduled Date</Typography>
        </Col>
        <Col span={14}>
          <Typography variant="p">
            {item.startDate && readDate(item.startDate)} - {item.endDate && readDate(item.endDate)}
          </Typography>
        </Col>
        <Col span={10}>
          <Typography variant="p">Rate</Typography>
        </Col>
        <Col span={14}>
          <Typography variant="p">{item.amount}</Typography>
        </Col>
        <Row className={styles.headers}>
          <Col span={20} className={markAllChecked.includes(item.id) ? styles.active : ''}>
            <Typography variant="p">SUB TOTAL INC.TAX(18% GST)</Typography>
          </Col>
          <Col span={4} className={markAllChecked.includes(item.id) ? styles.active : ''}>
            <Typography variant="p">{item.amount + item.amount * 0.18}</Typography>
          </Col>
        </Row>
      </Row>
    </Row>
  );
};

StoreItem.propTypes = {
  markAllChecked: array,
  item: object,
  onSelectCard: func,
};

export default StoreItem;
