'use strict';

const Fs = require('fs');
const Path = require('path');
const Chalk = require('chalk');
const Info = JSON.parse(Fs.readFileSync(Path.join(__dirname, '../../package.json'), 'utf-8'));
/* eslint-disable */
module.exports = function () {

  let content = `v${Info.version}\n` + Chalk.cyan.bold([
    '██████╗   ██████╗  ██╗',
    '██╔══██╗ ██╔═══██╗ ██║',
    '██████╔╝ ██║   ██║ ██║',
    '██╔══██╗ ██║   ██║ ██║',
    '██████╔╝ ╚██████╔╝ ██║',
    '╚═════╝   ╚═════╝  ╚═╝'
  ].join('\n'));

  console.log(content);
}
