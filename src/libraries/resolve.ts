import { Resolve } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export const setResolve = (resolve: Resolve, genius: WebpackGenius): void => {
  if (genius.hasPackage('typescript')) {
    resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
  } else {
    resolve.extensions = ['.js', '.jsx'];
  }

  resolve.alias = {};

  // @see https://webpack.docschina.org/guides/build-performance/#%E8%A7%A3%E6%9E%90
  resolve.symlinks = false;
  resolve.cacheWithContext = false;
};
