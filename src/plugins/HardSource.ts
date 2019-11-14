import path from 'path';
import { PluginHandle } from './PluginHandle';
import { Plugin } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

export class HardSource extends PluginHandle {
  protected directory: string | undefined;
  protected excluded: HardSourceWebpackPlugin.ExcludeModulePlugin.Option[] = [];

  setCacheDirectory(directory: string): this {
    this.directory = path.resolve(directory);

    return this;
  }

  exclude(test: HardSourceWebpackPlugin.ExcludeModulePlugin.TestElement) {
    this.excluded.push({
      test,
    });
  }

  public collect(): Plugin[] {
    return [
      new HardSourceWebpackPlugin({
        cacheDirectory: this.directory,
      }),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        {
          test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
        },
        ...this.excluded,
      ]),
    ];
  }
}
