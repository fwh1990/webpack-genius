import { PluginHandle } from './PluginHandle';
import { WebpackPluginInstance } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export class ReactRefresh extends PluginHandle {
  collect(): WebpackPluginInstance[] {
    return [
      new ReactRefreshWebpackPlugin({
        forceEnable: false,
        overlay: false,
      }),
    ];
  }
}
