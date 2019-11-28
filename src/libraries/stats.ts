import { Options } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export const setStats = (_: Options.Stats, genius: WebpackGenius): Options.Stats => {
  return {
    colors: true,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    moduleTrace: false,
    source: false,
    warnings: true,
    // 打包后的列表
    assets: genius.isBuild(),
    entrypoints: genius.isBuild(),
    children: false,
  };
};
