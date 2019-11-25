import { Resolve } from 'webpack';

export const setResolve = (resolve: Resolve): void => {
  resolve.extensions = [
    '.js', '.ts', '.tsx', '.jsx',
  ];

  // @see https://webpack.docschina.org/guides/build-performance/#%E8%A7%A3%E6%9E%90
  resolve.symlinks = false;
  resolve.cacheWithContext = false;
};
