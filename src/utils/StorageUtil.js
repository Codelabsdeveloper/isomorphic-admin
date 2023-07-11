/*
 * File: StorageUtil.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 18 2022 6:01:25 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

// let IFRAME = '_IFRAME';

const commonUtil = (key) => {
  // const urlParams = new URLSearchParams(window.location.search);
  // const myParam = urlParams.get('id');
  // if (myParam !== null) {
  //     key += IFRAME;
  // }
  return key;
};

const CryptoJS = require('crypto-js');

const key = CryptoJS.enc.Latin1.parse('Yq3t6w9z$B&E)H@M');
const iv = CryptoJS.enc.Latin1.parse('D*G-KaPdSgVkYp3s');

export const doEncrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  }).toString();
  return encrypted;
};

const deEncrypt = (encrypted) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.ZeroPadding,
  });
  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
export const setToLocalStorage = (key, data) => {
  key = commonUtil(key);
  const encryptedKey = doEncrypt(key);
  const encryptedValue = doEncrypt(JSON.stringify(data));
  window?.localStorage.setItem(encryptedKey, encryptedValue);
};

export const getFromLocalStorage = (key) => {
  key = commonUtil(key);
  const encryptedKey = doEncrypt(key);
  if (typeof window !== 'undefined' && window?.localStorage.getItem(encryptedKey)) {
    try {
      const data = JSON.parse(deEncrypt(window?.localStorage.getItem(encryptedKey)));
      return data;
    } catch (err) {
      return deEncrypt(window?.localStorage.getItem(encryptedKey));
    }
  }
  return null;
};

export const removeLocalStorage = (key) => {
  key = commonUtil(key);
  const encryptedKey = doEncrypt(key);
  if (window?.localStorage.getItem(encryptedKey)) {
    window?.localStorage.removeItem(encryptedKey);
  } else {
    window?.localStorage.removeItem(key);
  }
};
