#!/usr/bin/env ts-node

const option = process.argv.splice(2, 1)[0];

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
