/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Oct 05 2022 8:53:57 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { Slider, Row } from 'antd';
import { array, func } from 'prop-types';
import styles from './AntdRange.module.scss';

const AntdRange = ({ range, handleRangeChange }) => {
  const [isMounted, setMouted] = useState(false);

  useEffect(() => {
    setMouted(true);
  }, []);

  return (
    <Row className="fullwidth">
      {isMounted && (
        <Row className="fullwidth">
          Rental Cost
          <Slider
            range
            defaultValue={range}
            min={0}
            max={10000}
            onAfterChange={(val) => handleRangeChange(val)}
            className={styles.slider}
          />
        </Row>
      )}
    </Row>
  );
};

AntdRange.propTypes = {
  range: array,
  handleRangeChange: func,
};

export default AntdRange;
