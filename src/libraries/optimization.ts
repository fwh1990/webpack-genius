import { Configuration } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';
import TerserPlugin, { TerserPluginOptions } from 'terser-webpack-plugin';

export const setOptimization = (config: NonNullable<Configuration['optimization']>, webpack: WebpackGenius) => {
  config.nodeEnv = webpack.getEnvironment();
    // https://webpack.docschina.org/guides/build-performance/#minimal-entry-chunk
    config.runtimeChunk = true;

  if (webpack.isHot()) {
    // https://webpack.docschina.org/guides/build-performance/#avoid-extra-optimization-steps
    config.removeAvailableModules = false;
    config.removeEmptyChunks = false;
    config.splitChunks = false;
  } else {
    config.minimize = true;
    config.minimizer = [];
    config.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
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

export const setOptimizationAfter = (uglifyConfig: TerserPluginOptions | undefined, optimization: NonNullable<Configuration['optimization']>) => {
  if (optimization.minimize) {
    optimization.minimizer = optimization.minimizer || [];
    optimization.minimizer.push(new TerserPlugin(uglifyConfig));
  }
}
