import { PluginHandle } from './PluginHandle';
import { Plugin } from 'webpack';
import PreloadWebpackPlugin from 'preload-webpack-plugin';

export class Preload extends PluginHandle {
  protected rel: 'preload' | 'prefetch' = 'prefetch';

  public usePreload() {
    this.rel = 'preload';

    return this;
  }

  public usePrefetch() {
    this.rel = 'prefetch';

    return this;
  }

  collect(): Plugin[] {
    return [
      new PreloadWebpackPlugin({
        rel: this.rel,
      }),
    ];
  }
}
