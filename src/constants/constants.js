export const STORAGE = {
  AUTH: 'AUTH',
  EMAIL_ID: 'EMAIL_ID',
};

export const CREATIVE_WORK_FILE_TYPES = {
  pdf: {
    acceptTypes: '.pdf',
    fileType: 'application/pdf',
    imageTypeId: 3,
  },
  jpg: {
    acceptTypes: '.jpg,.jpeg',
    fileType: 'image/jpeg',
    imageTypeId: 4,
  },
  png: {
    acceptTypes: '.png',
    fileType: 'image/png',
    imageTypeId: 8,
  },
};

export const API_ORDER_STATUS = {
  current: 'CURRENT',
  done: 'DONE',
};

export const ORDER_STATUS = {
  created: {
    status: 'CREATED',
    stepNo: 0,
  },
  orderPlaced: {
    status: 'ORDER_PLACED',
    stepNo: 1,
  },
  createUploaded: {
    status: 'CREATE_UPLOADED',
    stepNo: 2,
  },
  printing: {
    status: 'PRINTING',
    stepNo: 3,
  },
  installationProcess: {
    status: 'INSTALLATION_PROCESS',
    stepNo: 4,
  },
  done: {
    status: 'DONE',
    stepNo: 5,
  },
  cancelled: {
    status: 'CANCELLED',
    stepNo: 6,
  },
};

export const AUDIT_MONTH_OPTIONS = [
  { value: 'January', label: 'January' },
  { value: 'Febuary', label: 'Febuary' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];
