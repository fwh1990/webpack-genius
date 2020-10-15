import { Configuration } from 'webpack';
import path from 'path';
import { WebpackGenius } from '../WebpackGenius';

export const setOutput = (_: Configuration['output'], genius: WebpackGenius): Configuration['output'] => {
  return {
    path: path.resolve('dist', genius.getEnvironment()),
    publicPath: './',
    filename: `scripts/[name].${genius.switchChunkHash()}.js`,
    // must be absolute path
    chunkFilename: `scripts/[name].${genius.switchChunkHash()}.js`,
    // https://webpack.docschina.org/guides/build-performance/#output-without-path-info
    pathinfo: false,
  };
};
