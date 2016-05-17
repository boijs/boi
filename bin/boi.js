#!/usr/bin/env node

'use strict'

let fs = require("fs");
let path = require('path');

let Promise = require("bluebird");
let program = require('commander');

let ora = require('ora');
let colors = require('colors');

require('shelljs/global');
// 引入boi-kernel模块
let boi = require('boi-kernel');
// local debug
// let boi = require('../../boi-kernel');

//将boi暴露为全局变量
Object.defineProperty(global, 'boi', {
    enumerable: true,
    writable: false,
    value: boi
});

let spinner = null;
let confChanged = true;

let watchConfFile = function(confFile) {
    fs.watch(confFile, function(event, filename) {
        if (event === 'change') {
            console.log(colors.blue('Configuration changed'));
            confChanged = true;
        }
    })
};

program.version('0.0.1');

program.command('init [dir]')
    .description('init')
    .action(function(dir) {
        if (!dir || dir === '/') {
            dir = './';
        }
    });

program.command('build [env]')
    .description('build project files')
    .action(function(env) {
        spinner = ora(colors.blue('Building...\n'));
        spinner.start();
        let _confFile = path.join(process.cwd(), '/boi-conf.js');

        if (confChanged) {
            Promise.try(function() {
                return fs.statSync(_confFile);
            }).then(function(stat) {
                require(_confFile);
                confChanged = false;
                // 首次执行配置行为之后监听配置文件
                // 如果没有改动则不必每次build都执行配置行为，以节省build时间
                watchConfFile(_confFile);
            }).then(function() {
                boi.resolvePlugins();
            }).then(function() {
                boi.runBuild(env);
            }).then(function() {
                spinner.stop();
            }).catch(function(err) {
                spinner.stop();
                throw new Error(err);
            });
        } else {
            Promise.try(function() {
                boi.runBuild(env);
            }).then(function() {
                spinner.stop();
            }).catch(function(err) {
                spinner.stop();
                throw new Error(err);
            });
        }

    });

program.command('run server')
    .description('run dev server')
    .action(function() {
        let _confFile = path.join(process.cwd(), '/boi-conf.js');
        if (confChanged) {
            Promise.try(function() {
                return fs.statSync(_confFile);
            }).then(function(stat) {
                require(_confFile);
                confChanged = false;
                watchConfFile(_confFile);
            }).then(function() {
                boi.resolvePlugins();
            }).then(function() {
                boi.runDevServer(env);
            }).catch(function(err) {
                throw new Error(err);
            });
        } else {
            Promise.try(function() {
                boi.runDevServer(env);
            }).catch(function(err) {
                throw new Error(err);
            });
        }

    });

program.parse(process.argv);
