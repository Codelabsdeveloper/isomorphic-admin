/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Oct 12 2022 10:27:41 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { array, func } from 'prop-types';
import { Row } from 'antd';
import styles from './SearchAreaList.module.scss';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';

const SearchAreaList = ({ areas, handleClick, handleAddCart, itemIds, handleAddAllToCart }) => {
  if (areas?.length === 0) {
    return (
      <Typography variant="p" className={styles.address}>
        No Data
      </Typography>
    );
  }

  return (
    <Row className={`${styles.searcharealist} fullwidth`}>
      <Row className="fullwidth">
        <Button
          size="small"
          action="submit"
          processingLabel="Please wait..."
          theme="secondary"
          className={styles.buttonaddall}
          onClick={() => handleAddAllToCart()}
          // disabled={item?.isSpaceOccquied || itemIds.includes(item.id)}
        >
          Add All
        </Button>
      </Row>
      {areas?.length &&
        areas?.map((item, index) => {
          return (
            <Row
              key={index}
              className={`${styles.addresscontainer} fullwidth`}
              onClick={() => handleClick(item)}
            >
              <Typography variant="h5" className={styles.storename}>
                {item.retailer.name}
              </Typography>
              <Typography variant="p" className={styles.address}>
                {item.address}
              </Typography>
              <Row justify="end" className="fullwidth">
                <Button
                  size="small"
                  action="submit"
                  processingLabel="Please wait..."
                  theme="secondary"
                  className={styles.button}
                  onClick={() => handleAddCart(item)}
                  disabled={item?.isSpaceOccquied || itemIds.includes(item.id)}
                >
                  Add
                </Button>
              </Row>
            </Row>
          );
        })}
    </Row>
  );
};

SearchAreaList.propTypes = {
  areas: array,
  handleClick: func,
  handleAddCart: func,
  itemIds: array,
  handleAddAllToCart: func,
};

export default SearchAreaList;
