import { Configuration } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export const setStats = (_: NonNullable<Configuration['stats']>, genius: WebpackGenius): Configuration['stats'] => {
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
