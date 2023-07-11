/*
 * File: Icon.jsx
 * Project: eb-reebok
 * Created Date: Tuesday, January 5th 2021, 11:05:05 pm
 * Author: Jebarin <jebarin.johnrose@nutechnologyinc.com>
 * -----
 * Last Modified: Sunday June 20th 2021 9:29:42 pm
 * Modified By: Jebarin <jebarin.johnrose@nutechnologyinc.com>
 * -----
 * Copyright (c) 2021 All rights reserved
 * ------------------------------------
 */

import { bool, func, string } from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './Icon.module.scss';

/**
 * Icon Component
 * @param {string} className - Classname to overrode styles
 * @param {string} id - id to place on icon
 * @param {function} onClick - Callback function on icon click
 * @param {string} iconName - Name to identify and load icon from svg folder (required)
 * @param {boolean} disabled - Flag to disable icon
 * @returns {function}
 */
const Icon = (props) => {
  const { onClick, iconName, id, className, disabled, ...restProps } = props;
  let isUnmounted = false;
  const [iconModule, setIconModule] = useState();

  useEffect(() => {
    import(
      /* webpackMode: "lazy-once" */
      /* webpackPrefetch: true */
      `!!@svgr/webpack!@Assets/svg/icons/${iconName}.svg`
    )
      .then((module) => module && module.default && !isUnmounted && setIconModule(module))
      .catch(
        /* istanbul ignore next */ () => {
          /* istanbul ignore next */
          throw `Icon "${iconName}" not found`;
        }
      );

    return () => {
      isUnmounted = true;
    };
  }, [iconName]);

  if (!iconModule) return null;
  const IconComponent = iconModule.default;
  const classes = [
    styles.icon,
    onClick ? styles.iconLink : '',
    disabled ? styles.iconDisabled : '',
    className,
  ].join(' ');

  return (
    <IconComponent
      id={id}
      className={classes}
      {...(!disabled && onClick && { onClick: onClick })}
      {...restProps}
    />
  );
};

Icon.defaultProps = {
  className: '',
  id: null,
  onClick: null,
  disabled: false,
};

Icon.propTypes = {
  iconName: string.isRequired,
  className: string,
  id: string,
  onClick: func,
  disabled: bool,
};

export default Icon;
