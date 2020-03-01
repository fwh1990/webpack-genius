import { Plugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { PluginHandle } from './PluginHandle';

export class Clean extends PluginHandle {
  public collect(): Plugin[] {
    return [
      new CleanWebpackPlugin(),
    ];
  }
}
