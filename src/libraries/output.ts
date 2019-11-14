import { Output } from 'webpack';
import path from 'path';
import { WebpackGenius } from '../WebpackGenius';

export const setOutput = (_: Output, genius: WebpackGenius): Output => {
  return {
    path: path.resolve('dist', genius.getEnvironment()),
    publicPath: './',
    filename: `scripts/js.[name].${genius.switchChunkHash()}.js`,
    // must be absolute path
    chunkFilename: `scripts/js.chunk.${genius.switchChunkHash()}.js`,
    pathinfo: false,
  };
};
