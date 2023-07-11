/*
 * File: index.js
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 08 2022 11:34:47 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 * Last Modified Date: Sun Sep 18 2022 8:51:37 PM
 * Author: Mohammed Parveez
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { useRef, useEffect } from 'react';
import { func, string, bool } from 'prop-types';
import { Row } from 'antd';
import useGoogleAutoComplete from '@Hooks/useGoogleAutoComplete';
import AntdInput from '@Atoms/AntdInput';

const GMapSearch = ({
  handleAddressChange,
  values,
  handleAddressBlur,
  onChangeInput,
  addressError,
  label,
  disabled,
  placeholder,
  errorMsg,
}) => {
  const inputRef = useRef();

  const { autoCompleteAddress } = useGoogleAutoComplete(inputRef);

  useEffect(() => {
    autoCompleteAddress &&
      Object?.entries(autoCompleteAddress).map(() => {
        handleAddressChange(autoCompleteAddress);
      });
  }, [autoCompleteAddress]);

  return (
    <Row className="fullwidth">
      <AntdInput
        required
        label={label}
        placeholder={placeholder}
        forwardRef={inputRef}
        value={values?.address}
        onBlur={handleAddressBlur}
        onChange={onChangeInput}
        errorMgs={addressError ? errorMsg : ''}
        disabled={disabled}
      />
    </Row>
  );
};
GMapSearch.propTypes = {
  handleAddressChange: func.isRequired,
  values: string,
  handleAddressBlur: func.isRequired,
  onChangeInput: func.isRequired,
  addressError: bool,
  label: string,
  disabled: bool,
  placeholder: string,
  errorMsg: string,
};

export default GMapSearch;
