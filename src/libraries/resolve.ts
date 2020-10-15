import { Configuration } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export const setResolve = (resolve: NonNullable<Configuration['resolve']>, genius: WebpackGenius): void => {
  resolve.extensions = [];

  if (genius.hasPackage('typescript')) {
    resolve.extensions = ['.ts'];

    if (genius.hasPackage('react')) {
      resolve.extensions.push('.tsx');
    }
  }

  resolve.extensions.push('.js');

  if (genius.hasPackage('react')) {
    resolve.extensions.push('.jsx');
  }

  if (genius.hasPackage('vue')) {
    resolve.extensions.push('.vue');
  }

  resolve.alias = {};

  // @see https://webpack.docschina.org/guides/build-performance/#%E8%A7%A3%E6%9E%90
  resolve.symlinks = false;
  resolve.cacheWithContext = false;
};
