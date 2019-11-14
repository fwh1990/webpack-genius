const option = process.argv.splice(2, 1)[0];

console.log(option, process.argv);

switch (option) {
  case 'start':
    require('webpack-dev-server/bin/webpack-dev-server.js');
    break;
  case 'build':
    require('webpack-cli/bin/cli.js');
    break;
  default:
    throw new Error('Unknown command');
}
