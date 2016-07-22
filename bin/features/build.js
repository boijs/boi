'use strict';

let fs = require('fs');
let path = require('path');
let Promise = require("bluebird");
let chalk = require('chalk');

const ENV = require('../constants/index.js').env;

module.exports = function(env) {
    console.log(chalk.cyan.bold("==> Building..."));
    Promise.try(function() {
        require(path.join(process.cwd(), '/boi-conf.js'));
    }).then(function() {
        boi.resolvePlugins();
    }).then(function() {
        process.env.BOI_ENV = env === ENV.production ? ENV.production : ENV.testing;
        boi.runBuild(env);
    }).catch(function(err) {
        console.log(chalk.red(err.stack));
        process.exit();
    });
};
