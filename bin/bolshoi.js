#!/usr/bin/env node
'use strict'

let program = require('commander');
let fsp = require('fs-promise');
let path = require('path');
// let promptly = require('promptly');

let bolshoi = require('bolshoi-kernel');

program.version('0.0.1');

program.command('init [dir]')
    .description('download waterloo analytics sourecode and init')
    .action(function(dir) {
        if (!dir || dir === '/') {
            dir = './';
        }
    });

program.command('build')
    .description('build project files')
    .action(function() {
        let _currentDir = path.resolve(process.cwd(),'./');
        
        let _conf = require(path.join(_currentDir,'/bolshoi-conf.js'));
        bolshoi.config(_conf);
        bolshoi.config.generateConfFile();
        
        // fsp.readFile(path.join(_currentDir,'/bolshoi-conf.js'))
        // .then(function(conf){
        //     console.log(conf);
        // }).catch(function(){
        //     console.log('Read configuration fils failed!');
        // });
    });
program.parse(process.argv);