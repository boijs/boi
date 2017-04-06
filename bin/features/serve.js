'use strict';

const Path = require('path');
const Promise = require('bluebird');

const ENV = require('../constants/index.js').env;

module.exports = function () {
  // dev server设置为development环境
  process.env.BOI_ENV = ENV.development;
  Promise.try(function () {
    require(Path.join(process.cwd(), '/boi-conf.js'));
  }).then(function () {
    /* eslint-disable */
    boi.resolvePlugins();
  }).then(function () {
    boi.runServe();
  }).catch(function (err) {
    throw err;
  });
};
