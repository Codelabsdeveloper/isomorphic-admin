/*
 * File: UseBrowserLayoutEffect.js
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 7:50:01 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { useLayoutEffect } from 'react';

const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => {};

export default useBrowserLayoutEffect;
