import { Plugin } from 'webpack';
import { PluginHandle } from './PluginHandle';
import CopyWebpackPlugin from 'copy-webpack-plugin';

type Patterns = (typeof CopyWebpackPlugin) extends new(patterns: infer P) => any ? NonNullable<P> : never;

type Pattern = Exclude<Patterns[0], string>;

export class Copy extends PluginHandle {
  protected patterns: Patterns = [];

  protected copy(pattern: Pattern): this {
    this.patterns.push(pattern);

    return this;
  }

  collect(): Plugin[] {
    if (this.patterns.length) {
      return [
        new CopyWebpackPlugin(this.patterns),
      ];
    }

    return [];
  }
}
