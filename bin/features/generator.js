'use strict';

require('shelljs/global');

const _ = require('lodash');
const Path = require('path');
const Ora = require('ora');
const Yeoman = require('yeoman-environment');

const YeomanRuntime = Yeoman.createEnv();

module.exports = (dirname, template) => {
  let appname = '';
  let inCurrentDir = false;
  // 不指定TemplateName使用默认的boiapp模板
  const TemplateName = template && template.split(/\:/)[0] || 'boiapp';
  let generator = `generator-${TemplateName}`;
  let appCommand = template || TemplateName;

  if (!dirname || dirname === '.' || dirname === './') {
    // 如果不指定appname则取值当前目录名称
    /* eslint-disable */
    appname = _.last(pwd().split(/\//));
    /* eslint-enable */
    inCurrentDir = true;
  } else {
    // 如果指定appname则创建子目录
    appname = dirname;
  }
  /* eslint-disable */
  exec('npm root -g', {
    async: true,
    silent: true
  }, (code, stdout) => {
    /* eslint-enable */
    const GeneratorPath = Path.posix.join(_.trim(stdout), generator);

    try {
      require.resolve(GeneratorPath);
      YeomanRuntime.register(require.resolve(GeneratorPath), appCommand);
      inCurrentDir ? YeomanRuntime.run(appCommand + ' ' + appname + ' -c') : YeomanRuntime.run(appCommand +
        ' ' + appname);
    } catch (e) {
      let spinner = Ora(`Installing ${generator}...`);
      spinner.start();
      /* eslint-disable */
      exec(`npm install -g ${generator}`, {
        async: true,
        silent: true
      }, (code) => {
        /* eslint-enable */
        if (code != 0) {
          spinner.fail(`Fail to install ${generator},please try install manually.`);
          process.exit();
        }
        spinner.succeed(`${generator} has been installed successfully.`);
        YeomanRuntime.register(require.resolve(GeneratorPath), appCommand);
        inCurrentDir ? YeomanRuntime.run(`${appCommand} ${appname} -c`) : YeomanRuntime.run(`${appCommand} ${appname}`);
      });
    }
  });

};
