'use strict';

let fs = require("fs");
let path = require('path');
let Promise = require("bluebird");
let chalk = require('chalk');

const ENV = require('../constants/index.js').env;

module.exports = function() {
    Promise.try(function() {
        require(path.join(process.cwd(), '/boi-conf.js'));
    }).then(function() {
        boi.resolvePlugins();
    }).then(function() {
        process.env.BOI_ENV = ENV.development;
        boi.runDevServer();
    }).catch(function(err) {
        console.log(chalk.red(err.stack));
        process.exit();
    });
};
