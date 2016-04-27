#!/usr/bin/env node

'use strict'

let program = require('commander');
let Promise = require("bluebird");
let fs = require("fs");
let path = require('path');
let ora = require('ora');
// let promptly = require('promptly');

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
        spinner = ora('building...\n');
        spinner.start();
        let _confFile = path.join(process.cwd(), '/boli-conf.js');

        Promise.try(function() {
            return fs.statSync(_confFile);
        }).then(function(stat) {
            require(_confFile);
        }).then(function() {
            boli.config.runBuild();
        }).then(function() {
            spinner.stop();
        }).catch(function(err) {
            spinner.stop();
            throw new Error(err);
        });
    });
program.parse(process.argv);
