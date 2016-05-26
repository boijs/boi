'use strict'

let path = require('path');
let Promise = require("bluebird");
let colors = require('colors');

let inquirer = require('inquirer');

require('shelljs/global');

// 默认app name
const DEFAULT_NAME = 'app';

let prompt = inquirer.createPromptModule();

let info = {
    appname: DEFAULT_NAME,
    modules: [],
    boiPlugins: [],
    thirdparty: []
};

let qs_appname = {
    type: 'input',
    name: 'appname',
    message: 'Give your app a nice name',
    default: 'app',
    validate: function(input) {
        // 命名规范，只能包含英文字母和.
        let reg = /^[a-zA-Z\.]+$/;
        if (reg.test(input)) {
            return true;
        } else {
            console.log(colors.red('\nInvalid appname!'))
            return false;
        }
    }
};

let qs_projtype = {
    type: 'list',
    name: 'projtype',
    message: 'Choose the type of your project',
    choices: ['normal', 'vue-thirdparty', 'vue-inline'],
    default: 0
};

let qs_vue = {
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules do you want',
    choices: ['vue-router']
};

let qs_normal = {
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules do you want',
    choices: ['vue', 'vue-router', 'zepto']
};

let qs_confirm = {
    type: 'confirm',
    name: 'confirm',
    message: 'Ready to go?',
    default: true
};

function execInit(options) {
    // replace plugins
    sed('-i', /BOIPLUGINS/g, options.boiPlugins.join('\n'), './boi-conf.js');
    // replace inline appname
    sed('-i', /APPNAME/g, options.appname, './src/js/main.app.js');
    sed('-i', /APPNAME/g, options.appname, './src/views/index.app.html');
    sed('-i', /APPNAME/g, options.appname, './boi-conf.js');

    if(options.appname!==DEFAULT_NAME){
        // replace appname in file name
        cp('-f', './src/js/main.app.js', './src/js/main.' + options.appname + '.js');
        cp('-f', './src/styles/main.app.scss', './src/styles/main.' + options.appname + '.scss');
        cp('-f', './src/views/index.app.html', './src/views/index.' + options.appname + '.html');
        // delete origin files
        rm('-f', ['./src/js/main.app.js', './src/styles/main.app.scss', './src/views/index.app.html']);
    }
    // copy thirdparty
    if(options.thirdparty&&options.thirdparty.length!==0){
        mkdir('./libs/');
        options.thirdparty.forEach(function(m){
            cp('-f',path.join(__dirname, '../../static/thirdparty/',m),'./libs/'+m);
        });
    }
    // install node modules
    if(options.modules && options.modules.length!==0){
        colors.blue('Install modules...');
        exec('npm install ' + options.modules.join(' ') + ' --save-dev');
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
    cp('-r', path.join(__dirname, '../../static/sample/*'), './');

    prompt(qs_appname).then(function(result) {
        if(!!result.appname){
            info = Object.assign({}, info, result);
        }
        return prompt(qs_projtype);
    }).then(function(result) {
        info = Object.assign({}, info, result);

        if (/\bvue/.test(result.projtype)) {
            if (result.projtype === 'vue-inline') {
                info.modules.push('vue');
            }else{
                info.thirdparty.push('vue.min.js');
            }
            info.modules.push('boi-plugin-loader-vue');
            info.boiPlugins.push('boi.use(\'boi-plugin-loader-vue\');');
            return prompt(qs_vue);
        } else {
            return prompt(qs_normal);
        }
    }).then(function(result) {
        if (result.modules && result.modules.length !== 0) {
            info = Object.assign({}, info, {
                modules: info.modules.concat(result.modules)
            });
        }
        return prompt(qs_confirm);
    }).then(function(result) {
        if (result.confirm) {
            execInit(info);
        } else {
            process.exit();
        }
    }).catch(function(err) {
        throw err;
    });
}
