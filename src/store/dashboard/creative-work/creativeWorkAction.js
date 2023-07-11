/* eslint-disable no-console */
/*
 * File: creativeWorkAction.js
 * Project: Shoprsmart
 * Created Date: Sat Oct 06 2022 3:24:14 PM
 * Author: Dholakia Vaibhav <vdholakia04@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs Infosoft
 * ------------------------------------
 */
import * as api from '@Configs/endpoints';
import {
  handleJPGFileList,
  handlePDFFileList,
  handlePNGFileList,
  handleIsUploadModalOpen,
} from './creativeWorkSlice';
import { getCurrentOrdersAction } from '../current-orders/currentOrderAction';
import { CREATIVE_WORK_FILE_TYPES, ORDER_STATUS } from '@Constants/constants';

const getFileImageTypeID = (file) => {
  if (file.type === CREATIVE_WORK_FILE_TYPES.pdf.fileType)
    return CREATIVE_WORK_FILE_TYPES.pdf.imageTypeId;
  else if (file.type === CREATIVE_WORK_FILE_TYPES.jpg.fileType)
    return CREATIVE_WORK_FILE_TYPES.jpg.imageTypeId;
  else if (file.type === CREATIVE_WORK_FILE_TYPES.png.fileType)
    return CREATIVE_WORK_FILE_TYPES.png.imageTypeId;
};

export const uploadCreativeWorkAction = (uploadFiles, orderId) => async (dispatch) => {
  let filepaths = {
    pdfDoc: '',
    pngDoc: '',
    jpgDoc: '',
  };

  const upload_status = await uploadFiles.map(async (file) => {
    const imageTypeId = getFileImageTypeID(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.postUploadCreativeWork(formData, imageTypeId, orderId);
      if (data.statusCode === 200 && data.response.message === 'uploaded successfully') {
        if (imageTypeId === CREATIVE_WORK_FILE_TYPES.pdf.imageTypeId) {
          filepaths.pdfDoc = data.response.filePath;
          dispatch(handlePDFFileList([]));
        } else if (imageTypeId === CREATIVE_WORK_FILE_TYPES.jpg.imageTypeId) {
          filepaths.jpgDoc = data.response.filePath;
          dispatch(handleJPGFileList([]));
        } else if (imageTypeId === CREATIVE_WORK_FILE_TYPES.png.imageTypeId) {
          filepaths.pngDoc = data.response.filePath;
          dispatch(handlePNGFileList([]));
        }
      }
    } catch (error) {
      console.log('file: CreativeWorkAction.js ~ line 36 ~ uploadFiles.forEach ~ error', error);
    }
  });
  await Promise.all(upload_status);

  try {
    const { data } = await api.putCreativeWorkFilePaths(filepaths, orderId);
    if (data?.statusCode === 200) {
      dispatch(getCurrentOrdersAction(ORDER_STATUS.created.status));
      dispatch(handleIsUploadModalOpen(false));
    }
  } catch (error) {
    console.log('file: CreativeWorkAction.js ~ line 61 ~ uploadCreativeWorkAction ~ error', error);
  }
};
