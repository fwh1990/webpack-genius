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
    stats: genius.collect().stats,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    },
    after: () => {
      const host = genius.collect().devServer?.host ?? '0.0.0.0';
      const realHost = host === '0.0.0.0' ? 'localhost' : host;

      setTimeout(() => openBrowser(`http://${realHost}:${port}/`), 2000);
    },
  };
};
