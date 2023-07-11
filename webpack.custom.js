/*
 * File: webpack.custom.js
 * Project: codelabs-boilderplate
 * Created Date: Wed Aug 31 2022 2:09:18 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

const path = require('path');

module.exports = (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@App': path.resolve(__dirname, '../src/app'),
    '@Assets': path.resolve(__dirname, '../src/assets'),
    '@Atoms': path.resolve(__dirname, '../src/atoms'),
    '@Hooks': path.resolve(__dirname, '../src/hooks'),
    '@Components': path.resolve(__dirname, '../src/components'),
    '@Utils': path.resolve(__dirname, '../src/utils'),
    '@Constants': path.resolve(__dirname, '../src/constants'),
    '@Configs': path.resolve(__dirname, '../src/configs'),
    '@Helpers': path.resolve(__dirname, '../src/helpers'),
    '@Styles': path.resolve(__dirname, '../src/styles'),
    '@Store': path.resolve(__dirname, '../src/store'),
  };

  // Override Next.js default CSS Modules config
  config.module.rules
    .find(({ oneOf }) => !!oneOf)
    .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
    .reduce((acc, { use }) => acc.concat(use), [])
    .forEach(({ options }) => {
      if (options.modules) {
        options.modules.exportLocalsConvention = 'camelCase';
      }
    });

  // Load images, icons and custom file extensions
  config.module.rules.push({
    test: /\.(ico|png|jp(e)g|webp|woff|woff2)$/,
    issuer: /\.(js|jsx)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 3000,
        fallback: 'file-loader',
        publicPath: '/_next/static/media/',
        outputPath: '../static/media/',
        name: '[name].[hash].[ext]',
      },
    },
  });

  // // Special treatment to inline svg icons and images loaded in js & jsx
  // // Svg icons in scss will be automatically handled by css modules
  config.module.rules.push({
    test: /\.(svg)$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // disable plugins
                    removeViewBox: false,
                  },
                },
                cleanupIDs: true,
              },
            ],
          },
        },
      },
    ],
  });

  return config;
};
