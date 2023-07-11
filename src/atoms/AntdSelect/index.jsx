/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 25 2022 7:00:15 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { Select, Row } from 'antd';
import { func, array, string, bool, object } from 'prop-types';
import Label from '@Atoms/label';
import Typography from '@Atoms/typography';
import styles from './AntdSelect.module.scss';

const { Option } = Select;

const AntdSelect = ({
  handleChange,
  options,
  label,
  required,
  errorMgs,
  forwardRef,
  noMargin,
  popupClassName,
  selectStyle,
  optionsStyle,
  allowClear,
  ...rest
}) => {
  const renderOptions = () => {
    return options.map((item, index) => {
      const value = item?.value || '';
      const label = item?.label || '';
      return (
        <Option key={index} value={value} style={optionsStyle}>
          {label}
        </Option>
      );
    });
  };

  return (
    <Row className={`${styles.antdSelect} fullwidth ${noMargin && styles.noMargin}`}>
      <Label label={label} required={required} />
      <Select
        size="large"
        onChange={handleChange}
        popupClassName={popupClassName}
        maxTagTextLength={200}
        style={selectStyle}
        {...(forwardRef && { ref: forwardRef })}
        {...rest}
        allowClear={allowClear ? allowClear : false}
      >
        {renderOptions()}
      </Select>
      <Typography variant="p" theme="error" className="field-errors">
        {errorMgs}
      </Typography>
    </Row>
  );
};

AntdSelect.defaultProps = {
  dropdownMatchSelectWidth: false,
};

AntdSelect.propTypes = {
  handleChange: func.isRequired,
  options: array.isRequired,
  required: bool,
  label: string,
  forwardRef: object,
  errorMgs: string,
  noMargin: bool,
  popupClassName: string,
  selectStyle: object,
  optionsStyle: object,
  allowClear: bool,
};

export default AntdSelect;
