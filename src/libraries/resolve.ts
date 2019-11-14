import { Resolve } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export const setResolve = (resolve: Resolve, genius: WebpackGenius): void => {
  resolve.extensions = [
    '.js', '.ts', '.tsx', '.jsx',
  ];

  // @see https://webpack.docschina.org/guides/build-performance/#%E8%A7%A3%E6%9E%90
  resolve.symlinks = false;
  resolve.cacheWithContext = false;

  if (genius.isDev()) {
    resolve.alias = resolve.alias || {};
    // If you are going to use `react-hot-loader` in project,
    // make sure `react-dom` and `@hot-loader/react-dom` have the same version.
    resolve.alias['react-dom'] = '@hot-loader/react-dom';
  }
};
