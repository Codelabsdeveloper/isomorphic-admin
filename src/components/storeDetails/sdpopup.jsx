/* eslint-disable max-len */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 6:58:04 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import React from 'react';
import { Row, Col, Rate } from 'antd';
import styles from '@Styles/StoreDetails.module.scss';
import StoreFields from '@Components/storeDetails';
import Typography from '@Atoms/typography';
import Image from '@Atoms/image/Image';
import Card from '@Components/card';
import { object } from 'prop-types';
import moment from 'moment';

function StoreDetailsPopUp({ dataToDisplay }) {
  let f = dataToDisplay?.retailerSpace?.psUrlDetails;
  // console.log('ffffffffffffffff',f);
  // f.map((item) => {
  //   console.log('itemmmmmmmmmmmm',item);
  // });

  const printCost = (d) => {
    let myArray = d.split('x');
    // console.log('aaaaaaaaaaaaaa firsec' ,  myArray );
    let dimensionMult = myArray[0] * myArray[1] * 50;
    return dimensionMult;
  };

  const readDate = (date) => {
    return date ? moment(date).format('DD MMM YYYY') : moment().format('DD MMM YYYY');
  };

  return (
    <>
      <Row className={styles.storedetails}>
        <Row className={styles.container} gutter={15}>
          <Col md={18}>
            <Row className={styles.section}>
              <StoreFields
                label={AppConfig.getCMSMessage('store_details.store_name')}
                value={dataToDisplay.retailer.name}
              />
              <StoreFields
                label={AppConfig.getCMSMessage('store_details.available_address')}
                value={dataToDisplay?.retailerSpace?.address}
              />
              <StoreFields
                label={AppConfig.getCMSMessage('store_details.agreement_type')}
                value={dataToDisplay.retailer.retailerType}
              />
              <StoreFields
                label={AppConfig.getCMSMessage('store_details.duration_options')}
                value={
                  readDate(dataToDisplay.scheduleDateStart) +
                  ' to ' +
                  readDate(dataToDisplay.scheduleDateEnd)
                }
              />
              <StoreFields label={AppConfig.getCMSMessage('store_details.const_scheme')} value="" />
              <StoreFields
                label={AppConfig.getCMSMessage('store_details.other_store_details')}
                value=""
              />
            </Row>
            <Row align="middle" className={styles.section}>
              <Col md={6}>
                <Typography variant="h5">
                  {AppConfig.getCMSMessage('store_details.image')}:
                </Typography>
              </Col>
              {/* Image display */}
              <Col md={16}>
                <div style={{ height: '100px', width: '80px' }}>
                  {f && f.length > 0
                    ? f.map((item, index) => {
                        return <Image key={index} src={item} styles={{ maxWidth: '100px' }} />;
                      })
                    : 'No Image'}
                </div>
              </Col>
            </Row>
            {/* Reviews */}
            <Row align="middle" className={styles.section}>
              <Col md={6}>
                <Typography variant="h5">
                  {AppConfig.getCMSMessage('store_details.reviews')}:
                  <Rate tooltips={'rating'} disabled value={dataToDisplay.createdBy} />
                </Typography>
              </Col>
              <Col md={16}>
                <Row className={styles.imgcontainer} gutter={15}></Row>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Card>
              <Typography variant="h5">
                {AppConfig.getCMSMessage('store_details.cost_calculations')}:
              </Typography>
              <br />
              <Typography variant="h6">
                Cost Per Month : {dataToDisplay?.retailerSpace?.cost}
              </Typography>
              <Typography variant="h6">
                18% GST Per Month: {dataToDisplay?.retailerSpace?.cost * 0.18}
              </Typography>
              <Typography variant="h6">
                Dimension : {dataToDisplay?.retailerSpace?.dimension}
              </Typography>
              <Typography variant="h6">
                Branding & Print Cost : {printCost(dataToDisplay?.retailerSpace?.dimension)} (
                dimension * 50)
              </Typography>
              <Typography variant="h5">
                Grand Total :{' '}
                {dataToDisplay?.retailerSpace?.cost +
                  dataToDisplay?.retailerSpace?.cost * 0.18 +
                  printCost(dataToDisplay?.retailerSpace?.dimension)}
              </Typography>
            </Card>
          </Col>
        </Row>
      </Row>
    </>
  );
}

StoreDetailsPopUp.propTypes = {
  dataToDisplay: object,
};

export default StoreDetailsPopUp;
