import { Plugin, HotModuleReplacementPlugin } from 'webpack';
import { PluginHandle } from './PluginHandle';

export class HotModule extends PluginHandle {
  public collect(): Plugin[] {
    return [
      new HotModuleReplacementPlugin(),
    ];
  }
}
