import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import { WebpackGenius } from '../WebpackGenius';

export const setDevServer = (_: WebpackDevServer.Configuration, genius: WebpackGenius): WebpackDevServer.Configuration => {
  return {
    contentBase: '.',
    publicPath: '/',
    port: genius.getPort(),
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    clientLogLevel: 'none',
    quiet: false,
    inline: true,
    overlay: true,
    open: true,
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
  };
};

export const setDevServerAfter = (config: WebpackDevServer.Configuration, genius: WebpackGenius): void => {
  const host = config.host || '0.0.0.0';
  config.host = host;

  if (!config.stats) {
    config.stats = genius.getConfig().stats;
  }

  if (config.open) {
    const originalAfter = config.after;
    const displayHost = host === '0.0.0.0' ? 'localhost' : host;
    const protocol = config.http2 || config.https ? 'https' : 'http';

    config.open = false;
    config.after = (app, server, compile) => {
      originalAfter?.(app, server, compile);
      setTimeout(() => openBrowser(`${protocol}://${displayHost}:${config.port}/`), 3000);
    };
  }
};
