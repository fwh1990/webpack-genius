import { WebpackPluginInstance, HotModuleReplacementPlugin } from 'webpack';
import { PluginHandle } from './PluginHandle';

export class HotModule extends PluginHandle {
  public collect(): WebpackPluginInstance[] {
    return [
      new HotModuleReplacementPlugin(),
    ];
  }
}
