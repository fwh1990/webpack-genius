#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

const option = process.argv.splice(2, 1)[0];

if (process.argv.indexOf('--config') === -1) {
  if (
    !fs.existsSync(path.resolve('webpack.config.ts')) &&
    !fs.existsSync(path.resolve('webpack.config.js'))
  ) {
    process.argv.push('--config', path.join(__dirname, 'misc', 'webpack.config.js'))
  }
}

switch (option) {
  case 'start':
    process.env.IS_HOT = 'yes';
    require('webpack-dev-server/bin/webpack-dev-server.js');
    break;
  case 'build':
    process.env.IS_HOT = 'no';
    require('webpack-cli/bin/cli.js');
    break;
  default:
    throw new Error('Unknown command');
}
