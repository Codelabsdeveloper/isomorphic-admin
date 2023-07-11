'use strict';
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const algorithm = 'aes-256-cbc'; // Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var hash = require('sjcl-hash-sha256/hash');

const secret =
  '440ce3611e6ab7940eb29b92f1be51ef4e7b78e64233b0155198790681e384bdbe19e6b189470913774f74bec89cde7b9eec9148b6f24cedef6ef9ad74b8d1a7';
/* Encrypting text */
function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text.toString());
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { key: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
  let iv = Buffer.from(text.key, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function encryptStaticKey(text) {
  return CryptoJS.AES.encrypt(text, secret).toString();
}

function decryptStaticKey(text) {
  var decrypted = CryptoJS.AES.decrypt(text, secret);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function encryptOTP(text) {
  return hash(text).toString();
}

module.exports = {
  encryptFn: encrypt,
  decryptFn: decrypt,
  encryptStaticKey,
  decryptStaticKey,
  encryptOTP,
};
