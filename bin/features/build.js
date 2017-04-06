'use strict';

const Path = require('path');
const Promise = require('bluebird');
const Chalk = require('chalk');

const ENV = require('../constants').env;

module.exports = function (env) {
  process.env.BOI_ENV = env || ENV.testing;
  Promise.try(function () {
    require(Path.join(process.cwd(), '/boi-conf.js'));
  }).then(function () {
    /* eslint-disable */
    boi.resolvePlugins();
  }).then(function () {
    boi.runBuild();
  }).catch(function (err) {
    console.log(Chalk.red(err.stack));
    process.exit(0);
  });
};
