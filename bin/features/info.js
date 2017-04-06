'use strict';

let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let info = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
/* eslint-disable */
module.exports = function(){
    let  content = [
        '',
        '  v' + info.version,
        '',
        '   ' + chalk.blue.bold(' \/\\\\\\') + '                                        '+chalk.blue.bold('\/\\\\\\'),
        '    ' + chalk.blue.bold('\\\/\\\\\\') + '                                       '+chalk.blue.bold('\\\///'),
        '     ' + chalk.blue.bold('\\\/\\\\\\') + '                                                 ',
        '      ' + chalk.blue.bold('\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '      ' + chalk.blue.bold('\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '      ' + chalk.blue.bold('\/\\\\\\'),
        '       ' + chalk.blue.bold('\\\/\\\\\\/////////\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\/////////\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\'),
        '        ' + chalk.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\'),
        '         ' + chalk.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\'),
        '          ' + chalk.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\'),
        '           ' + chalk.blue.bold('\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '     ' + chalk.blue.bold('\\\/\\\\\\'),
        '            ' + chalk.blue.bold('\\\///////////////') + '      ' + chalk.blue.bold('\\\///////////////') + '      ' + chalk.blue.bold('\\\///'),

    ].join('\n');
    console.log( content);
}
