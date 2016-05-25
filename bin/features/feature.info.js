'use strict'

let colors = require('colors');

module.exports = function(version){
    let  content = [
        '',
        '  v' + version,
        '',
        '   ' + colors.blue.bold(' \/\\\\\\') + '                                        '+colors.blue.bold('\/\\\\\\'),
        '    ' + colors.blue.bold('\\\/\\\\\\') + '                                       '+colors.blue.bold('\\\///'),
        '     ' + colors.blue.bold('\\\/\\\\\\') + '                                                 ',
        '      ' + colors.blue.bold('\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '      ' + colors.blue.bold('\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '      ' + colors.blue.bold('\/\\\\\\'),
        '       ' + colors.blue.bold('\\\/\\\\\\/////////\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\/////////\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\'),
        '        ' + colors.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\'),
        '         ' + colors.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\'),
        '          ' + colors.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\\       \\\/\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\'),
        '           ' + colors.blue.bold('\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\') + '     ' + colors.blue.bold('\\\/\\\\\\'),
        '            ' + colors.blue.bold('\\\///////////////') + '      ' + colors.blue.bold('\\\///////////////') + '      ' + colors.blue.bold('\\\///'),

    ].join('\n');
    console.log( content);
}
