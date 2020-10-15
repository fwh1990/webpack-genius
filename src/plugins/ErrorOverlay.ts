import { WebpackPluginInstance } from 'webpack';
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';
import { PluginHandle } from './PluginHandle';

export class ErrorOverlay extends PluginHandle {
  public collect(): WebpackPluginInstance[] {
    const { devtool } = this.genius.getConfig();

    // 'eval' is not supported by error-overlay-webpack-plugin
    if (!devtool || typeof devtool === 'string' && devtool.includes('eval')) {
      return [];
    }

    return [
      new ErrorOverlayPlugin(),
    ];
  }
}
