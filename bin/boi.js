#!/usr/bin/env node
'use strict'

require('shelljs/global');
let program = require('commander');

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

program.usage('<cmd> [options]');
program.option('-v, --version', 'output the version info', function() {
    require('./features/info.js')();
})
program.on("--help", function() {
    require('./features/info.js')();
});

program.command('new [dir]')
    .description('create a new project')
    .action(function(dir) {
        require('./features/new.js')(dir);
    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi new demo');
        console.log('    $ boi new .');
    });

program.command('build [env]')
    .description('build project files')
    .action(function(env) {
        require('./features/build.js')(env);
    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi build');
        console.log('    $ boi build dev');
        console.log('    $ boi build prod\n');
    });

program.command('serve')
    .description('run dev server')
    .action(function() {
        require('./features/serve.js')();
    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi serve');
    });

program.command('deploy [env]')
    .description('deploy to remote server')
    .action(function(env) {
        require('./features/deploy.js')(env);
    }).on('--help', function() {
        console.log('  Examples:\n');
        console.log('    $ boi deploy');
    });

program.parse(process.argv);
