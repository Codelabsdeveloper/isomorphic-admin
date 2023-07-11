/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sat Sep 10 2022 12:24:11 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import React from 'react';
import { Row } from 'antd';
import { number, array, func, bool } from 'prop-types';
import Typography from '@Atoms/typography';
import styles from './CartTable.module.scss';
import moment from 'moment';

const CartTable = ({ cartDetails, totalPrice, handleRemove, showRemove }) => {
  const readDate = (date) => {
    return moment(date).format('DD MMM YYYY');
  };
  return (
    <Row className={styles.cart}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Typography variant="h5" className={styles.title}>
                {AppConfig.getCMSMessage('cart.table.header.shop_name')}
              </Typography>
            </th>
            <th className={styles.location}>
              <Typography variant="h5" className={styles.title}>
                {AppConfig.getCMSMessage('cart.table.header.location')}
              </Typography>
            </th>
            <th>
              <Typography variant="h5" className={styles.title}>
                {AppConfig.getCMSMessage('cart.table.header.duration')}
              </Typography>
            </th>
            <th className={styles.leasing}>
              <Typography variant="h5" className={styles.title}>
                {AppConfig.getCMSMessage('cart.table.header.dimensions')}
              </Typography>
            </th>
            <th className={styles.cost}>
              <Typography variant="h5" className={styles.title}>
                {AppConfig.getCMSMessage('cart.table.header.cost')}
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <Typography variant="h5" className={styles.body}>
                    {item.retailer.name}
                  </Typography>
                  {showRemove && (
                    <Typography
                      variant="p"
                      className={styles.remove}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Typography>
                  )}
                </td>
                <td>
                  <Typography variant="p" className={styles.paragraph}>
                    {item?.retailerSpace?.address}
                  </Typography>
                </td>
                <td className={styles.textcenter}>
                  <Typography variant="p" className={styles.paragraph}>
                    {readDate(item.scheduleDateStart)} - {readDate(item.scheduleDateEnd)}
                  </Typography>
                </td>
                <td className={styles.textcenter}>
                  <Typography variant="p" className={styles.paragraph}>
                    {item?.retailerSpace?.dimension}
                  </Typography>
                </td>
                <td className={styles.textright}>
                  <Typography variant="p" className={styles.cost}>
                    ₹ {item.cost + item.cost * 0.18}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Row className={styles.footer}>
        <Typography variant="h5" className={styles.title}>
          Total
        </Typography>
        <Typography variant="h5" className={styles.price}>
          ₹ {totalPrice + totalPrice * 0.18}
        </Typography>
      </Row>
    </Row>
  );
};

CartTable.propTypes = {
  cartDetails: array,
  handleRemove: func,
  showRemove: bool,
  totalPrice: number,
};

CartTable.defaultProps = {
  cartDetails: [],
  showRemove: false,
  totalPrice: 0,
};

export default CartTable;
