'use strict';

const Path = require('path');
const Promise = require('bluebird');
const ENV = require('../constants/index.js').env;

module.exports = function () {
  // dev server设置为development环境
  process.env.BOI_ENV = ENV.development;
  Promise.try(() => {
    require(Path.join(process.cwd(), '/boi-conf.js'));
  }).then(() => {
    /* eslint-disable */
    boi.resolvePlugins();
  }).then(() => {
    boi.runServe();
  }).catch(err => {
    throw err;
  });
};
