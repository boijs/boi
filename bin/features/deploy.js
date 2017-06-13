'use strict';

const Path = require('path');
const Promise = require('bluebird');
const Chalk = require('chalk');

const ENV = require('../constants').env;

module.exports = function (env) {
  process.env.BOI_ENV = env || ENV.testing;
  /* eslint-disable */
  console.log(Chalk.cyan.bold(`==> Deploy to ${process.env.BOI_ENV} server...`));
  Promise.try(() => {
    require(Path.join(process.cwd(), '/boi-conf.js'));
  }).then(() => {
    boi.runDeploy();
  }).catch(err => {
    throw err;
    process.exit();
  });
};
