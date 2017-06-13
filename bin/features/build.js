'use strict';

const Path = require('path');
const Promise = require('bluebird');
const Chalk = require('chalk');
const ENV = require('../constants').env;

module.exports = function (env) {
  process.env.BOI_ENV = env || ENV.testing;
  Promise.try(() => {
    require(Path.join(process.cwd(), '/boi-conf.js'));
  }).then(() => {
    /* eslint-disable */
    boi.resolvePlugins();
  }).then(() => {
    boi.runBuild();
  }).catch(err => {
    throw err;
    process.exit();
  });
};
