'use strict';

require('shelljs/global');

const Path = require('path');
const Yeoman = require('yeoman-environment');
const _ = require('lodash');
const Chalk = require('Chalk');
const Ora = require('ora');

let env = Yeoman.createEnv();

module.exports = (dirname, template) => {
  let appname = '';
  let inCurrentDir = false;
  // 不指定templateName使用默认的boiapp模板
  let templateName = template && template.split(/\:/)[0] || 'boiapp';
  let generator = 'generator-' + templateName;
  let appCommand = template || templateName;

  if (!dirname || dirname === '.' || dirname === './') {
    // 如果不指定appname则取值当前目录名称
    appname = _.last(pwd().split(/\//));
    inCurrentDir = true;
  } else {
    // 如果指定appname则创建子目录
    appname = dirname;
  }

  let npmRoot = exec('npm root -g', {
    async: true,
    silent: true
  }, (code, stdout, stderr) => {
    let npmRoot = _.trim(stdout);
    let generatorPath = Path.posix.join(npmRoot, generator);

    try {
      require.resolve(generatorPath);
      env.register(require.resolve(generatorPath), appCommand);
      inCurrentDir ? env.run(appCommand + ' ' + appname + ' -c') : env.run(appCommand +
        ' ' + appname);
    } catch (e) {
      let spinner = Ora('Installing ' + generator + '......');
      spinner.start();
      exec('npm install -g ' + generator, {
        async: true,
        silent: true
      }, (code) => {
        if (code != 0) {
          spinner.fail('Fail to install ' + generator + ',please try install manually.');
          process.exit();
        }
        spinner.succeed(generator + 'has been installed successfully.');
        env.register(require.resolve(generatorPath), appCommand);
        inCurrentDir ? env.run(appCommand + ' ' + appname + ' -c') : env.run(
          appCommand + ' ' + appname);
      });
    }
  });

};
