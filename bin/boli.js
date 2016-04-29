#!/usr/bin/env node

'use strict'

let fs = require("fs");
let path = require('path');

let Promise = require("bluebird");
let program = require('commander');
// let promptly = require('promptly');

let ora = require('ora');
let colors = require('colors');

require('shelljs/global');
// 引入boli-kernel模块
require('boli-kernel');

// local debug
// require('../../boli-kernel');

let spinner = null;

program.version('0.0.1');

program.command('init [dir]')
    .description('download waterloo analytics sourecode and init')
    .action(function(dir) {
        if (!dir || dir === '/') {
            dir = './';
        }
    });

program.command('build')
    .description('build project files')
    .action(function() {
        spinner = ora(colors.blue('Building...\n'));
        spinner.start();
        let _confFile = path.join(process.cwd(), '/boli-conf.js');

        Promise.try(function() {
            return fs.statSync(_confFile);
        }).then(function(stat) {
            require(_confFile);
        }).then(function() {
            boli.resolvePlugins();
        }).then(function() {
            boli.runBuild();
        }).then(function() {
            spinner.stop();
        }).catch(function(err) {
            spinner.stop();
            throw new Error(err);
        });
    });
program.parse(process.argv);
