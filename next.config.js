/*
 * File: next.config.js
 * Project: codelabs-boilderplate
 * Created Date: Sat Aug 27 2022 2:43:49 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

var customConfig = require('./webpack.custom.js');
var rewriteMapping = require('./rewrite.config.js');
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

// Detect build environment
const env = process.env.NODE_ENV;
const isDev = env !== 'production';

const urlRewrites = {
  async rewrites() {
    return [...rewriteMapping[env], ...rewriteMapping.common];
  },
};

const pluginAntdLess = withAntdLess({
  // modifyVars: { '@primary-color': 'red' }, // optional
  lessVarsFilePath: './src/styles/variables.less', // optional
  lessVarsFilePathAppendToEndOfContent: false, // optional
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // ...
    mode: 'local',
    localIdentName: isDev ? '[local]--[hash:base64:4]' : '[hash:base64:8]', // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: 'camelCase',
    exportOnlyLocals: false,
    // ...
    // getLocalIdent params: (context, _localIdentName, localName, options) => {
    getLocalIdent: () => {
      return 'cl-';
    },
  },
});

module.exports = withPlugins([[pluginAntdLess]], {
  ...urlRewrites,

  // for Next.js ONLY
  nextjs: {
    localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
    reactStrictMode: false,
    swcMinify: true,
  },
  webpack: (config) => {
    // Add your custom webpack config here
    config = customConfig(config, isDev);

    return config;
  },
});
