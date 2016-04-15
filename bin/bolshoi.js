#!/usr/bin/env node
'use strict'

let program = require('commander');
let Promise = require("bluebird");
let fs = require("fs");
let path = require('path');
// let promptly = require('promptly');

// let bolshoi = require('bolshoi-kernel');

// local debug 
let bolshoi = require('../../bolshoi-kernel');

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
        let _confFile = path.join(process.cwd(),'/bolshoi-conf.js');
        
        Promise.try(function(){
            return fs.statSync(_confFile);
        }).then(function(stat){
            require(_confFile);
        }).then(function(){
            bolshoi.config.generateConfFile();
        }).catch(function(err){
            console.log(err);
        });
    });
program.parse(process.argv);