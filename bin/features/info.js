const Fs = require('fs');
const Path = require('path');
const Chalk = require('chalk');
const Info = JSON.parse(Fs.readFileSync(Path.join(__dirname, '../../package.json'), 'utf-8'));

/* eslint-disable */
module.exports = function () {
  const Content = '\n' + Chalk.green([
    '██████╗   ██████╗  ██╗',
    '██╔══██╗ ██╔═══██╗ ██║',
    '██████╔╝ ██║   ██║ ██║',
    '██╔══██╗ ██║   ██║ ██║',
    '██████╔╝ ╚██████╔╝ ██║',
    '╚═════╝   ╚═════╝  ╚═╝'
  ].join('\n')) + `\n\n Version: ${Info.version}\n\n`;

  process.stdout.write(Content);
};
