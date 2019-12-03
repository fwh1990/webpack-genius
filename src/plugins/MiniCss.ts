import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Plugin } from 'webpack';
import { PluginHandle } from './PluginHandle';

// https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
export class MiniCss extends PluginHandle {
  protected readonly config: MiniCssExtractPlugin.PluginOptions = {
    filename: `styles/[name].${this.genius.switchContentHash()}.css`,
    chunkFilename: `styles/chunk.${this.genius.switchContentHash()}.css`,
    ignoreOrder: true,
  };

  public setFilename(name: string): this {
    this.config.filename = name;

    return this;
  }

  public setChunkFilename(name: string): this {
    this.config.chunkFilename = name;

    return this;
  }

  public setIgnoreOrder(ignore: boolean): this {
    this.config.ignoreOrder = ignore;

    return this;
  }

  public collect(): Plugin[] {
    return [
      new MiniCssExtractPlugin(this.config),
    ];
  }
}
