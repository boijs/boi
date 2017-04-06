#!/usr/bin/env node
'use strict';

require('shelljs/global');
const Program = require('commander');

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

Program.usage('<cmd> [options]');
Program.option('-v, --version', 'output the version info', function () {
  require('./features/info.js')();
});
Program.on('--help', function () {
  require('./features/info.js')();
});

Program.command('new [dir]')
  .description('create a new project')
  .option('-t --template [template]', 'specify template application')
  .action(function (dir, options) {
    require('./features/generator.js')(dir, options.template);
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi new demo -t webapp');
    console.log('    $ boi new . -t webapp');
    /* eslint-enable */
  });

Program.command('build [env]')
  .description('build project files')
  .action(function (env) {
    require('./features/build.js')(env);
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi build');
    console.log('    $ boi build dev');
    console.log('    $ boi build prod\n');
    /* eslint-enable */
  });

Program.command('serve')
  .description('run dev server')
  .action(function () {
    require('./features/serve.js')();
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi serve');
    /* eslint-enable */
  });

Program.command('deploy [env]')
  .description('deploy to remote server')
  .action(function (env) {
    require('./features/deploy.js')(env);
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi deploy');
    /* eslint-enable */
  });

Program.parse(process.argv);
