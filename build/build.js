'use strict'

let path = require('path');
let markdownInclude = require('markdown-include');

let configPath = path.join(__dirname, '../markdown.json');

markdownInclude.compileFiles(configPath, function() {
    console.log('done');
});
