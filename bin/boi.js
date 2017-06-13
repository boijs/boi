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
  .usage('[dir] --template <template>')
  .option('-t, --template [template]', 'specify template application')
  .action(function (dir, options) {
    require('./features/generator.js')(dir, options.template);
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi new demo -t webapp');
    console.log('    $ boi new . -t webapp');
    /* eslint-enable */
  });

Program.command('build')
  .description('build project files')
  .usage('--env <env>')
  .option('-e, --env [env]','specify build environment')
  .action(function (options) {
    require('./features/build.js')(options.env);
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi build');
    console.log('    $ boi build --env testing');
    console.log('    $ boi build --env prod\n');
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

Program.command('deploy')
  .description('deploy to remote server')
  .usage('--env <env>')
  .option('-e --env [env]','specify build environment')
  .action(function (options) {
    require('./features/deploy.js')(options.env);
  }).on('--help', function () {
    /* eslint-disable */
    console.log('  Examples:\n');
    console.log('    $ boi deploy --env testing');
    console.log('    $ boi deploy --env prod');
    /* eslint-enable */
  });

Program.parse(process.argv);
