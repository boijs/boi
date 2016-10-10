'use strict';

let fs = require('fs');
let path = require('path');
let Promise = require("bluebird");
let chalk = require('chalk');

const ENV = require('../constants').env;

module.exports = function(env) {
    console.log(chalk.cyan.bold("==> Building..."));
    process.env.BOI_ENV = env || ENV.testing;
    Promise.try(function() {
        require(path.join(process.cwd(), '/boi-conf.js'));
    }).then(function() {
        boi.resolvePlugins();
    }).then(function() {
        boi.runBuild();
    }).catch(function(err) {
        console.log(chalk.red(err.stack));
        process.exit();
    });
};
