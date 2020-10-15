import { WebpackPluginInstance } from 'webpack';
import { PluginHandle } from './PluginHandle';
import CopyWebpackPlugin from 'copy-webpack-plugin';

type Options = (typeof CopyWebpackPlugin) extends new(patterns: infer P) => any ? NonNullable<P> : never;

type Pattern = Exclude<Options['patterns'][number], string>;

export class Copy extends PluginHandle {
  protected patterns: Pattern[] = [];

  public copy(pattern: Pattern): this {
    this.patterns.push(pattern);

    return this;
  }

  collect(): WebpackPluginInstance[] {
    if (this.patterns.length) {
      return [
        new CopyWebpackPlugin({
          patterns: this.patterns,
        }),
      ];
    }

    return [];
  }
}
