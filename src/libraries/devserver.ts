import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import { WebpackGenius } from '../WebpackGenius';

export const setDevServer = (_: WebpackDevServer.Configuration, genius: WebpackGenius): WebpackDevServer.Configuration => {
  const port = genius.getPort();

  return {
    contentBase: '.',
    publicPath: '/',
    port,
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    clientLogLevel: 'none',
    quiet: false,
    inline: true,
    overlay: true,
    open: true,
    stats: genius.collect().stats,
    // transportMode: 'ws',
    watchOptions: {
      aggregateTimeout: 1,
      ignored: /node_modules/,
      poll: false,
    },
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    },
    after: () => {
      if (genius.isOpenBrowser()) {
        const collect = genius.collect();
        const host = collect.devServer?.host ?? '0.0.0.0';
        const realHost = host === '0.0.0.0' ? 'localhost' : host;
        const protocol = collect.devServer?.http2 || collect.devServer?.https ? 'https' : 'http';

        setTimeout(() => openBrowser(`${protocol}://${realHost}:${port}/`), 3000);
      }
    },
  };
};
