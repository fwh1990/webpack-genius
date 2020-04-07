import { PluginHandle } from './PluginHandle';
import { Plugin } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export class ReactRefresh extends PluginHandle {
  collect(): Plugin[] {
    return [
      new ReactRefreshWebpackPlugin({
        forceEnable: false,
        overlay: false,
      }),
    ];
  }
}
