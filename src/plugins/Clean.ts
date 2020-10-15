import { WebpackPluginInstance } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { PluginHandle } from './PluginHandle';

export class Clean extends PluginHandle {
  public collect(): WebpackPluginInstance[] {
    return [
      new CleanWebpackPlugin(),
    ];
  }
}
