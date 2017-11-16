#!/usr/bin/env node

const Path             = require('path');
const BoiMock          = require('boi-mock');
const Cli              = require('commander');
const BoiParser        = require('boi-parser');
const BoiDeployer      = require('boi-deploy');
const BoiServer        = require('boi-server');
const BoiCompiler      = require('boi-compiler');
const FeatureInfo      = require('./features/info.js');
const FeatureGenerator = require('./features/generator.js');

/**
 * @desc 解析boi配置文件
 * @param {string} env 环境变量
 * @param {Array} ignorePattern 忽略解析模块
 * @return {Promise}
 */
function ParseConfiguration(env, ignorePattern) {
  return new Promise((resolve, reject) => {
    BoiParser(Path.join(process.cwd(), '/boi-conf.js'), (err, configuration) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(configuration);
    }, env, ignorePattern);
  });
}

function print(content){
  process.stdout.write(content);
}

function AdjustEnv(env) {
  return !env || env === 'dev' ? 'testing' : env;
}

Cli.usage('command [options]');

// 打印版本信息
Cli.option('-v, --version', 'print Boi version', () => {
  FeatureInfo();
});

// 脚手架
Cli.command('new [type]')
  .description('generate a new app or page')
  .usage('[type] [options]')
  .option('-t, --template [template]', 'specify template of new app')
  .option('-p, --path [path]', 'specify pathname of new app')
  .action((type, options) => {
    FeatureGenerator(type, options.path, options.template);
  }).on('--help', () => {
    print('\n\n  Examples:\n');
    print('    $ boi new');
    print('    $ boi new page');
    print('    $ boi new app -p demo');
    print('    $ boi new app -p demo -t webapp\n');
  });

// 编译
Cli.command('build')
  .alias('compile')
  .description('run build progress')
  .usage('[options]')
  .option('-e, --env [env]', 'specify build environment')
  .option('-i, --init', 'init all configurations and install plugins&dependencies')
  .action(options => {
    process.env.BOI_ENV = options.env || 'testing';
    ParseConfiguration(AdjustEnv(options.env), ['mock', 'serve']).then(configuration => {
      BoiCompiler({
        compile: configuration.compile,
        deploy: configuration.deploy,
        plugins: configuration.plugins
      }, options.init);
    }).catch(err => {
      // print error message and exit process
      throw new Error(err);
    });
  }).on('--help', () => {
    print('\n\n  Examples:\n');
    print('    $ boi build -e testing\n');
  });

// 开发服务器
Cli.command('serve')
  .alias('server')
  .description('run local server for development')
  .option('-i, --init', 'init all configurations and install plugins&dependencies')
  .option('-s, --separate', 'run server without mock')
  .action(options => {
    process.env.BOI_ENV = 'dev';
    if (options.separate) {
      ParseConfiguration('dev', ['mock', 'deploy']).then(configuration => {
        BoiServer({
          compile: configuration.compile,
          deploy: configuration.deploy,
          plugins: configuration.plugins,
          serve: configuration.serve
        }, options.init);
      }).catch(err => {
        throw new Error(err);
      });
    } else {
      ParseConfiguration('dev', ['deploy']).then(configuration => {
        BoiServer({
          compile: configuration.compile,
          deploy: configuration.deploy,
          serve: configuration.serve,
          plugins: configuration.plugins,
          mock: configuration.mock
        }, options.init);
      }).catch(err => {
        throw new Error(err);
      });
    }
  }).on('--help', () => {
    print('\n\n  Examples:\n');
    print('    $ boi serve\n');
  });

// run mock server separately
Cli.command('mock')
  .description('run mock server separately')
  .usage('[options]')
  .option('-p, --port [port]', 'specify port that be listened')
  .action(options => {
    ParseConfiguration('dev', ['compile', 'plugins', 'serve', 'deploy']).then(configuration => {
      BoiMock(null, configuration.mock, options.port);
    }).catch(err => {
      throw new Error(err);
    });
  }).on('--help', () => {
    print('\n\n  Examples:\n');
    print('    $ boi mock -p 8888\n');
  });

// 远程部署
Cli.command('deploy')
  .alias('release')
  .description('deploy application')
  .usage('[options]')
  .option('-e, --env [env]', 'specify deploy environment')
  .action(options => {
    if (options.env === 'dev') {
      throw new Error('Deploy/release is not available on development environment');
    }
    process.env.BOI_ENV = options.env || 'testing';
    ParseConfiguration(AdjustEnv(options.env), ['plugins', 'serve', 'mock']).then(configuration => {
      if (configuration.compile && configuration.compile.basic && configuration.compile.basic.output) {
        BoiDeployer(configuration.compile.basic.output, configuration.deploy, configuration.compile.basic.appname);
      } else {
        throw 'Invalid basic configuration';
      }
    }).catch(err => {
      throw new Error(err);
    });
  }).on('--help', () => {
    print('  Examples:\n');
    print('    $ boi deploy -e testing\n');
  });

Cli.parse(process.argv);