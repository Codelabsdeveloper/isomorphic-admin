/*
 * File: ProtectedPage.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Aug 31 2022 2:08:44 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 8:50:50 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { useRouter } from 'next/router';
import { any } from 'prop-types';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';

const ProtectedPage = ({ children }) => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line max-len
    const isProtected =
      getFromLocalStorage(STORAGE.AUTH) &&
      Object.keys(getFromLocalStorage(STORAGE.AUTH)).length > 0;

    if (!isProtected) {
      router.push('/');
    }
    return (isProtected && <div>{children}</div>) || <div />;
  }

  return null;
};

//Props validation
ProtectedPage.propTypes = {
  children: any,
};

export default ProtectedPage;
