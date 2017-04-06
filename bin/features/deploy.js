'use strict';

let path = require('path');
let Promise = require('bluebird');
let chalk = require('chalk');

const ENV = require('../constants').env;

module.exports = function (env) {
  process.env.BOI_ENV = env || ENV.testing;
  /* eslint-disable */
  console.log(chalk.cyan.bold(`==> Deploy to ${process.env.BOI_ENV} server...`));
  Promise.try(function () {
    require(path.join(process.cwd(), '/boi-conf.js'));
  }).then(function () {
    boi.runDeploy();
  }).catch(function (err) {
    console.log(chalk.red(err.stack));
    process.exit();
  });
};
