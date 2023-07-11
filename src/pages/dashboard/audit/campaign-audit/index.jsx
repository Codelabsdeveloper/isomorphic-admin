/*
 * File: index.jsx
 * Project: Shoprsmart
 * Created Date: Fri Nov 04 2022 8:07:49 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */
import React, { useRef } from 'react';
import { Row, Col, Select, Tooltip, Carousel } from 'antd';
import { object } from 'prop-types';
import styles from './CampaignAudit.module.scss';
import Typography from '@Atoms/typography';
import Image from '@Atoms/image/Image';
import Button from '@Atoms/button';
import PDFIcon from '@Assets/images/pdf-icon.png';
import { AUDIT_MONTH_OPTIONS } from '@Constants/constants';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CampaignAudit = ({ campaign }) => {
  const carouselRef = useRef(null);
  // console.log('file: index.jsx ~ line 14 ~ CampaignAudit ~ campaign', campaign);
  if (!campaign) return;
  else
    return (
      <>
        <Row>
          <Col span={12}>
            <Tooltip title="Download Creative Work">
              <Button size="small" theme="tertiary">
                <Image src={PDFIcon.src} />
              </Button>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Select
                defaultValue={AUDIT_MONTH_OPTIONS[new Date().getMonth()]}
                placeholder="Select Month"
                options={AUDIT_MONTH_OPTIONS}
                className={styles.month_selector}
              />
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Typography variant="h4">
            <u>Store Image Slider</u>
          </Typography>
        </Row>
        <Row>
          <Col span={6} className={styles.center_slider_btns}>
            <Button
              className={styles.slider_btns}
              size="small"
              theme="tertiary"
              onClick={() => carouselRef.current.prev()}
            >
              <MdOutlineArrowBackIos />
            </Button>
          </Col>
          <Col span={12}>
            <Carousel dots={false} ref={carouselRef}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Col>
          <Col span={6} className={styles.center_slider_btns}>
            <Button
              className={styles.slider_btns}
              size="small"
              theme="tertiary"
              onClick={() => carouselRef.current.next()}
            >
              <MdOutlineArrowForwardIos />
            </Button>
          </Col>
        </Row>

        <br />
        <Row justify="center">
          <Typography variant="p_bold">Percentage of Similarity = - %</Typography>
        </Row>
        <br />
        <Row justify="end">
          <Button size="small" theme="tertiary">
            Disard
          </Button>
          <Button size="small">Accept</Button>
        </Row>
      </>
    );
};

CampaignAudit.propTypes = {
  campaign: object,
};

CampaignAudit.defaultProps = {
  campaign: null,
};

export default CampaignAudit;
