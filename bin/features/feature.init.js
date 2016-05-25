'use strict'

let path = require('path');
let Promise = require("bluebird");
let prompt = require('prompt');
let colors = require('colors');

require('shelljs/global');

// 默认app name
const DEFAULT_NAME = 'app';

// prompt输入内容的验证规则
let schema = {
    properties: {
        appName: {
            type: 'string',
            pattern: /^[a-zA-Z]+$/,
            description: 'Give your app a nice name',
            message: 'appName must be only letters',
            required: false,
            default: 'app'
        }
    }
};

module.exports = function(dir) {
    let _dir = dir;
    // 若未提供明确的目录名，则使用当前文件夹作为项目根目录
    if (!_dir || _dir === '.') {
        _dir = './';
    }

    let appName = DEFAULT_NAME;

    // 若在当前目录生成项目，不必执行mkdir
    if (_dir !== './') {
        // 创建项目根目录
        mkdir(_dir);
    }

    // 进入项目根目录
    cd(dir);

    // 将boi sample文件拷贝至新项目目录内
    cp('-r', path.join(__dirname, '../../sample/*'), './');

    prompt.start();

    // 提示用户输入一些项目必要信息
    prompt.get(schema, function(err, result) {
        if (err) {
            throw err;
        }

        appName = result.appName;
        prompt.stop();

        // 若用户定制了app name，则将sample文件中的app name进行替换
        if (appName !== DEFAULT_NAME) {
            sed('-i', /app/g, appName, './src/js/main.app.js');
            sed('-i', /app/g, appName, './src/views/index.app.html');
            sed('-i', /app\b/g, appName, './boi-conf.js');

            cp('-f', './src/js/main.app.js', './src/js/main.' + appName + '.js');
            cp('-f', './src/styles/main.app.scss', './src/styles/main.' + appName + '.scss');
            cp('-f', './src/views/index.app.html', './src/views/index.' + appName + '.html');

            rm('-f', ['./src/js/main.app.js', './src/styles/main.app.scss', './src/views/index.app.html']);
        }
        console.log(colors.blue('boi app ' + appName + 'has been created successfully!'));
    });
}
