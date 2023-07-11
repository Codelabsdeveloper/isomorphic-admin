/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Sep 28 2022 2:15:36 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider } from 'antd';
// import Icon from '@Atoms/icon/Icon';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';
import styles from './CreativeWork.module.scss';
// import dynamic from 'next/dynamic';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {
  handlePDFFileList,
  handleJPGFileList,
  handlePNGFileList,
} from '@Store/dashboard/creative-work/creativeWorkSlice';
import { uploadCreativeWorkAction } from '@Store/dashboard/creative-work/creativeWorkAction';
import { CREATIVE_WORK_FILE_TYPES } from '@Constants/constants';

// const DashboardLayout = dynamic(() => import('@Atoms/dashboardLayout'), { ssr: false });

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  // onChange(info) {
  //   const { status } = info.file;

  //   if (status !== 'uploading') {
  //     // console.log(info.file, info.fileList);
  //   }

  //   if (status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },

  // onDrop(e) {
  //   // console.log('Dropped files', e.dataTransfer.files);
  // },
};

const CreativeWork = () => {
  const dispatch = useDispatch();

  const { pdfFileList, jpgFileList, pngFileList, currentOrderForUpload } = useSelector(
    (state) => state.creativeWorkSlice
  );

  const pdfUploadProps = {
    accept: CREATIVE_WORK_FILE_TYPES.pdf.acceptTypes,
    fileList: pdfFileList,
    beforeUpload: (file) => {
      const isPDF = file.type === CREATIVE_WORK_FILE_TYPES.pdf.fileType;
      if (!isPDF) message.error(`${file.name} is not a PDF file.`);
      else dispatch(handlePDFFileList([file]));
      return isPDF || Upload.LIST_IGNORE;
    },
    onRemove: () => {
      dispatch(handlePDFFileList([]));
    },
  };

  const jpgUploadProps = {
    accept: CREATIVE_WORK_FILE_TYPES.jpg.acceptTypes,
    fileList: jpgFileList,
    beforeUpload: (file) => {
      const isJPG = file.type === CREATIVE_WORK_FILE_TYPES.jpg.fileType;
      if (!isJPG) message.error(`${file.name} is not a JPG/JPEG file.`);
      else dispatch(handleJPGFileList([file]));
      return isJPG || Upload.LIST_IGNORE;
    },
    onRemove: () => {
      dispatch(handleJPGFileList([]));
    },
  };

  const pngUploadProps = {
    accept: CREATIVE_WORK_FILE_TYPES.png.acceptTypes,
    fileList: pngFileList,
    beforeUpload: (file) => {
      const isJPG = file.type === CREATIVE_WORK_FILE_TYPES.png.fileType;
      if (!isJPG) message.error(`${file.name} is not a PNG file.`);
      else dispatch(handlePNGFileList([file]));
      return isJPG || Upload.LIST_IGNORE;
    },
    onRemove: () => {
      dispatch(handlePNGFileList([]));
    },
  };

  const uploadFiles = () => {
    const finalUploadFileList = [...pdfFileList, ...jpgFileList, ...pngFileList];
    dispatch(uploadCreativeWorkAction(finalUploadFileList, currentOrderForUpload?.id));
  };

  return (
    // <DashboardLayout>
    <Row className={styles.creativework}>
      {/* <Typography variant="h4">Upload Creative Work here</Typography> */}
      Order ID: &nbsp; <strong>{currentOrderForUpload?.id}</strong> <Divider type="vertical" />
      Order Number: &nbsp; <strong>{currentOrderForUpload?.orderNumber}</strong>
      <Row className={styles.uploadcontainer}>
        <Row className={styles.uploadItem}>
          <Col md={6}>
            <Typography variant="h5">Upload PDF file : </Typography>
          </Col>
          <Col md={18}>
            <Dragger {...props} {...pdfUploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Col>
        </Row>
        <Row className={styles.uploadItem}>
          <Col md={6}>
            <Typography variant="h5">Upload JPG file : </Typography>
          </Col>
          <Col md={18}>
            <Dragger {...props} {...jpgUploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Col>
        </Row>
        <Row className={styles.uploadItem}>
          <Col md={6}>
            <Typography variant="h5">Upload PNG file : </Typography>
          </Col>
          <Col md={18}>
            <Dragger {...props} {...pngUploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Col>
        </Row>
      </Row>
      <Col span={24}>
        <Row justify="center">
          <Button
            theme="primary"
            size="small"
            onClick={() => uploadFiles()}
            disabled={
              pdfFileList.length === 0 && jpgFileList.length === 0 && pngFileList.length === 0
            }
          >
            Upload
          </Button>
        </Row>
      </Col>
    </Row>
    // </DashboardLayout>
  );
};

export default CreativeWork;
