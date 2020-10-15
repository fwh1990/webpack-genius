#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import yargs from 'yargs/yargs';

const optionName = process.argv.splice(2, 1)[0];
const args = yargs().alias('e', 'env').alias('c', 'config').parse(process.argv.slice(2));
const env = args['env'] as string | undefined;

if (!args['config']) {
  if (
    !fs.existsSync(path.resolve('webpack.config.ts')) &&
    !fs.existsSync(path.resolve('webpack.config.js'))
  ) {
    process.argv.push('--config', path.join(__dirname, 'misc', 'webpack.config.js'));
  }
}

const setEnv  = (defaultEnv: string) => {
  if (env === undefined) {
    process.argv.push('--env', defaultEnv);
  }

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = env || defaultEnv;
  }
};

switch (optionName) {
  case 'start':
    process.env.IS_HOT = 'yes';
    setEnv('development');
    require('v8-compile-cache');
    require('webpack-dev-server/bin/webpack-dev-server.js');
    break;
  case 'build':
    process.env.IS_HOT = 'no';
    setEnv('production');
    require('webpack-cli/bin/cli.js');
    break;
  default:
    throw new Error('Unknown command');
}
