const _        = require('lodash');
const Path     = require('path');
const Shell    = require('shelljs');
const BoiUtils = require('boi-utils');
const Yeoman   = require('yeoman-environment');

const YeomanRuntime = Yeoman.createEnv();

module.exports = (dirname, template) => {
  let appname = '';
  let inCurrentDir = false;
  // 不指定TemplateName使用默认的boiapp模板
  const TemplateName = template && template.split(/\:/)[0] || 'boiapp';
  const GenerateTemplate = `generator-${TemplateName}`;
  const AppCommand = template || TemplateName;

  if (!dirname || dirname === '.' || dirname === './') {
    // 如果不指定appname则取值当前目录名称
    appname = _.last(process.cwd().split(/\//));
    inCurrentDir = true;
  } else {
    // 如果指定appname则创建子目录
    appname = dirname;
  }

  // to compate nvm system
  Shell.exec('npm root -g', {
    async: true,
    silent: true
  }, (code, stdout) => {
    // global template path
    const TemplatePath = Path.posix.join(_.trim(stdout), GenerateTemplate);

    try {
      const TemplateRealPath = require.resolve(TemplatePath);
      YeomanRuntime.register(TemplateRealPath, AppCommand);
      inCurrentDir ? YeomanRuntime.run(`${AppCommand} ${appname} -c`) : YeomanRuntime.run(`${AppCommand} ${appname}`);
    } catch (e) {
      BoiUtils.log.loading(new Promise((resolve,reject) => {
        Shell.exec(`npm install -g ${GenerateTemplate}`, {
          async: true,
          silent: true
        }, (code) => {
          if (code != 0) {
            reject(`Install ${GenerateTemplate} fails,please try install manually.`);
          }
          YeomanRuntime.register(require.resolve(TemplatePath), AppCommand);
          inCurrentDir ? YeomanRuntime.run(`${AppCommand} ${appname} -c`) : YeomanRuntime.run(`${AppCommand} ${appname}`);
          resolve({
            msg: `Install ${GenerateTemplate} succeed`
          });
        });
      }),`Installing ${GenerateTemplate}...`);
    }
  });

};
