import { Plugin, HashedModuleIdsPlugin } from 'webpack';
import { PluginHandle } from "./PluginHandle";

export class HashedModuleIds extends PluginHandle {
  public collect(): Plugin[] {
    return [
      new HashedModuleIdsPlugin(),
    ];
  }
}
