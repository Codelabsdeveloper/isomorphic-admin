/*
 * File: ADA.js
 * Project: codelabs-boilderplate
 * Created Date: Sat Sep 03 2022 2:03:13 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

/**
 * Function - handleFocusInAndOut
 * @param {function} focusInCallback - On keyUp callback function
 * @param {function} focusOutCallback - On keyUp callback function
 * @param {function} moveUpCallback - On keyUp callback function for item moveup
 * @param {function} moveDownCallback - On keyUp callback function for item movedown
 * @param {function} pressEnterCallback - On keyUp callback function for item enter
 * @returns {*}
 */

export const handleFocusInAndOut = ([focusInCallback, focusOutCallback], e) => {
  if (e?.key?.toLowerCase() === 'enter' && e?.keyCode === 13) {
    return focusInCallback?.(e);
  } else if (e?.key?.toLowerCase() === 'escape' && e?.keyCode === 27) {
    return focusOutCallback?.(e);
  }
};

export const handleMoveUpAndDown = ([moveUpCallback, moveDownCallback, pressEnterCallback], e) => {
  if (e?.key?.toLowerCase() === 'arrowup' && e?.keyCode === 38) {
    return moveUpCallback?.(e);
  } else if (e?.key?.toLowerCase() === 'arrowdown' && e?.keyCode == 40) {
    return moveDownCallback?.(e);
  } else if (e?.key?.toLowerCase() === 'enter' && e?.keyCode === 13) {
    return pressEnterCallback?.(e);
  }
};
