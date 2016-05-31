#!/usr/bin/env node

'use strict'

let fs = require("fs");
let path = require('path');

let Promise = require("bluebird");
let program = require('commander');

let ora = require('ora');
let colors = require('colors');

require('shelljs/global');

let feature_info = require('./features/feature.info.js');
let feature_init = require('./features/feature.init.js');

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

let info = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

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

program.version(info.version);
program.usage('<cmd> [option]');
program.option('-v --version', 'output the version info');

program.on("--help", function() {
    feature_info(info.version);
});

// 创建一个新项目目录
// dir是新项目目标路径
program.command('new [dir]')
    .description('create a new project')
    .action(function(dir) {
        feature_init(dir)
    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi new demo');
        console.log('    $ boi new .');
        console.log('    $ boi new ./\n');
    });

// 编译项目文件
// env为编译环境设置，默认dev
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

    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi build');
        console.log('    $ boi build dev');
        console.log('    $ boi build prod\n');
    });

// 运行本地dev server
program.command('serve')
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

    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi serve');
        console.log('    $ boi run server\n');
    });

program.parse(process.argv);
