'use strict';

let fs = require("fs");
let path = require('path');
let Promise = require("bluebird");
let chalk = require('chalk');

const ENV = require('../constants/index.js').env;

module.exports = function() {
  // dev server设置为development环境
  process.env.BOI_ENV = ENV.development;
  Promise.try(function() {
    require(path.join(process.cwd(), '/boi-conf.js'));
  }).then(function() {
    boi.resolvePlugins();
  }).then(function() {
    boi.runServe();
  }).catch(function(err) {
    console.log(chalk.red(err.stack));
    process.exit();
  });
};
