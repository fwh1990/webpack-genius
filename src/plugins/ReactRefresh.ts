import { PluginHandle } from './PluginHandle';
import { Plugin } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export class ReactRefresh extends PluginHandle {
  collect(): Plugin[] {
    return [
      new ReactRefreshWebpackPlugin({
        // Turn on this property with issue https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/15
        disableRefreshCheck: true,
        forceEnable: false,
      }),
    ];
  }
}
