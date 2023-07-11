/*
 * File: StoresList.jsx
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 29 2022 12:08:32 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox } from 'antd';
import styles from './StoresList.module.scss';
import moment from 'moment';
import StoreItem from './StoreItem';
import { array, object, func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { updatecartDetailsAction } from '@Store/register-cart/cartAction';

function StoresList({ storesList, campaignDataProps, selDateRangeCardProps, setPriceGlobal }) {
  const [markAllChecked, setMarkAllChecked] = useState([]);
  const [markAllCheckedParent, setMarkAllCheckedParent] = useState(false);
  const [objectOfStore, setObjectOfStore] = useState([]);
  const [grandTotal, setGrandTotal] = useState('');

  const dispatch = useDispatch();

  const onStoreslistSelectAll = () => {
    if (markAllCheckedParent) {
      setMarkAllChecked([]);
    } else {
      setMarkAllChecked(storesList?.map((item) => item.id));
    }
    setMarkAllCheckedParent(!markAllCheckedParent);
  };

  const onStoreslistSelect = (r) => {
    let id = r.target.id;
    let ar = markAllChecked;
    if (markAllChecked.includes(id)) {
      // ar = markAllChecked.filter((itm) => itm != id);
      if (markAllChecked.length === storesList.length) {
        ar = [id];
      } else {
        ar = [];
      }
      setMarkAllCheckedParent(false);
    } else {
      // ar.push(id);
      ar = [id];
    }
    setMarkAllChecked([...ar]);
    if (ar.length === storesList.length) {
      setMarkAllCheckedParent(true);
    }
  };

  useEffect(() => {
    let finalObjectOfStore = [];
    if (storesList.length > 0) {
      let sum = 0;
      let setCheck = true;
      storesList.map((item) => {
        finalObjectOfStore.push({
          name: item.retailer.name,
          id: item.id,
          amount: item.cost,
          startDate: item.scheduleDateStart,
          endDate: item.scheduleDateEnd,
          retailerCost: item?.retailerSpace?.cost,
        });
        sum = sum + item.cost;
        if (!item.cost) {
          setCheck = false;
        }
      });
      let sumWithGST = sum + sum * 0.18;
      setGrandTotal(sumWithGST);
      setObjectOfStore(finalObjectOfStore);
      setPriceGlobal(sumWithGST > 0 && setCheck);
    }
  }, [storesList]);

  useEffect(() => {
    let x = selDateRangeCardProps.selection2;
    let xs = x?.startDate;
    let xe = x?.endDate;
    let sum = 0;
    let setCheck = true;
    if (objectOfStore.length > 0) {
      objectOfStore.map((item) => {
        if (markAllChecked.includes(item.id)) {
          item.amount = calculateRatesOnDateSelection(x, item.retailerCost);
          item.startDate = readDate(xs);
          item.endDate = readDate(xe);
          if (item.startDate && item.endDate) {
            let payload = {
              id: item.id,
              scheduleDateStart: item.startDate,
              scheduleDateEnd: item.endDate,
              cost: item.amount,
            };
            dispatch(updatecartDetailsAction(item.id, payload));
          }
        }

        sum = sum + item.amount;
        if (!item.amount) {
          setCheck = false;
        }
      });
      let sumWithGST = sum + sum * 0.18;
      setGrandTotal(sumWithGST);
      setObjectOfStore(objectOfStore);
      setPriceGlobal(sumWithGST > 0 && setCheck);
    }
  }, [selDateRangeCardProps]);

  const readDate = (date) => {
    return moment(date).format('DD MMM YYYY');
  };

  const calculateRatesOnDateSelection = (x, cst) => {
    let xs = x?.startDate;
    let xe = x?.endDate;
    let beginDate = moment(xs).format('DD MMM YYYY');
    let endDate = moment(xe).format('DD MMM YYYY');

    if (beginDate && endDate) {
      var startDatez = moment(beginDate, 'DD MMM YYYY');
      var endDatez = moment(endDate, 'DD MMM YYYY');

      var result = endDatez.diff(startDatez, 'days');

      let cost = Math.ceil(result / 30) * cst;
      return cost;
    }
  };

  return (
    <>
      <Row className={styles.storeslistcontainer}>
        <Col>Campaign Name :{campaignDataProps.name}</Col>
        <Col span={24}>
          <span className={styles.storetitle}> Total {objectOfStore.length} shops </span>
          <Checkbox onChange={onStoreslistSelectAll} checked={markAllCheckedParent}>
            Select all
          </Checkbox>
        </Col>

        {objectOfStore && objectOfStore.length > 0
          ? objectOfStore.map((item, index) => {
              return (
                <>
                  <Row className={`${styles.storescontainer} fullwidth`} key={index}>
                    <StoreItem
                      item={item}
                      onSelectCard={onStoreslistSelect}
                      markAllChecked={markAllChecked}
                    />
                  </Row>
                </>
              );
            })
          : 'No items'}
        <Row>
          <span>
            <b> Grand Total : {grandTotal} </b>
          </span>
        </Row>
      </Row>
    </>
  );
}

StoresList.propTypes = {
  storesList: array,
  selDateRangeCardProps: object,
  setPriceGlobal: func,
  campaignDataProps: object,
};

export default StoresList;
