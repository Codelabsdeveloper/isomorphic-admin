/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Oct 02 2022 12:51:35 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { object, func, array } from 'prop-types';
// import Icon from '@Atoms/icon/Icon';
import styles from './AddToCartPopUp.module.scss';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';
// import Image from '@Atoms/image/Image';
import { Image } from 'antd';
import { IoMdClose } from 'react-icons/io';

const AddToCartPopUp = ({ position, handleClosePopup, popupData, handleAddCart, itemIds }) => {
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  return (
    <Row className={styles.addToCartPopUp} style={position}>
      <Row className={styles.closeicon} onClick={() => handleClosePopup()}>
        <IoMdClose />
      </Row>
      <Row className={styles.image} justify="center">
        <Image
          preview={{
            visible: imagePreviewVisible,
            onVisibleChange: () => setImagePreviewVisible(!imagePreviewVisible),
          }}
          src={popupData?.psUrlDetails[0]}
        />
        <div
          style={{
            display: 'none',
          }}
        >
          <Image.PreviewGroup
            preview={{
              visible: imagePreviewVisible,
              onVisibleChange: () => setImagePreviewVisible(!imagePreviewVisible),
            }}
          >
            {popupData?.psUrlDetails &&
              popupData?.psUrlDetails.map((item) => (
                <>
                  <Image src={item} />
                </>
              ))}
          </Image.PreviewGroup>
        </div>
      </Row>
      <Col md={24}>
        <Row className={styles.title}>
          <Typography variant="h4">{popupData?.retailer?.name}</Typography>
        </Row>
        <Row className={styles.content}>
          <Typography variant="p">
            <span>Dimention: </span> {popupData?.dimension} <br />
            <span>Street: </span> {popupData?.address} <br />
            <span>Duration: </span> One Month <br />
            <span>Footfall: </span> {popupData?.retailer?.footFall}
            <br />
            <span>Cost: </span> ₹ {popupData?.cost} <br />
          </Typography>
        </Row>
      </Col>

      {/* <Row className={styles.closeicon} onClick={() => handleClosePopup()}>
        <IoMdClose />
      </Row>
      <Row gutter={15}>
        <Col md={12}>
          <Row className={styles.title}>
            <Typography variant="h4">{popupData?.retailer?.name}</Typography>
          </Row>
          <Row className={styles.content}>
            <Typography variant="p">
              <span>Dimension</span> : {popupData?.dimension}
            </Typography>
            <Typography variant="p">
              <span>Street</span> : {popupData?.address}
            </Typography>
            <Typography variant="p">
              <span>Duration</span> : One Month
            </Typography>
            <Typography variant="p">
              <span>Footfall</span> : -
            </Typography>
            <Typography variant="p">
              <span>Cost</span> : ₹ {popupData?.cost}
            </Typography>
          </Row>
        </Col>
        <Col md={12}>
          {popupData?.psUrlDetails[0] !== '' ? (
            <Row className={styles.image}>
              <Image src={popupData?.psUrlDetails[0]} />
            </Row>
          ) : (
            <Icon className={styles.icon} iconName="shop" />
          )}
        </Col>
      </Row> */}
      <Row gutter={15} className={styles.footer}>
        <Col md={12}>
          <Button
            size="small"
            action="submit"
            processingLabel="Please wait..."
            theme="secondary"
            className={styles.button}
          >
            Review
          </Button>
        </Col>
        <Col md={12}>
          <Button
            size="small"
            action="submit"
            processingLabel="Please wait..."
            theme="secondary"
            className={styles.button}
            onClick={() => handleAddCart(popupData)}
            disabled={popupData?.isSpaceOccquied || itemIds.includes(popupData.id)}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

AddToCartPopUp.propTypes = {
  position: object,
  handleClosePopup: func,
  popupData: object,
  handleAddCart: func,
  itemIds: array,
};

export default AddToCartPopUp;
