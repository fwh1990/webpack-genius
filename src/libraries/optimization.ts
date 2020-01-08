import { Options } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export const setOptimization = (config: Options.Optimization, webpack: WebpackGenius) => {
  config.nodeEnv = webpack.getEnvironment();

  if (webpack.isHot()) {
    config.removeAvailableModules = false;
    config.removeEmptyChunks = false;
    config.splitChunks = false;
  } else {
    config.runtimeChunk = true;
    config.minimize = true;
    config.minimizer = [];
    config.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    };
  }
};
