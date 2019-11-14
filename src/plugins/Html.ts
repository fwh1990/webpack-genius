import path from 'path';
import { Plugin } from 'webpack';
import { PluginHandle } from './PluginHandle';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export class Html extends PluginHandle {
  protected readonly clones: Html[] = [];
  protected config: HtmlWebpackPlugin.Options = {
    filename: 'index.html',
    html5: true,
    hash: false,
    chunksSortMode: 'dependency',
    minify: {
      collapseWhitespace: true,
      minifyJS: this.genius.isProd(),
      minifyCSS: this.genius.isProd(),
      removeComments: true,
    },
  };

  public setTemplate(relativePath: string): this {
    this.config.template = path.resolve(relativePath);

    return this;
  }

  public setTitle(title: string): this {
    this.config.title = title;

    return this;
  }

  public mergeConfig(config: HtmlWebpackPlugin.Options): this {
    this.config = {
      ...this.config,
      ...config,
      minify: {
        ...this.config.minify,
        ...config.minify,
      },
    };

    return this;
  }

  public clone(): Html {
    const plugin = new Html(this.genius);
    this.clones.push(plugin);

    return plugin;
  }

  public collect(): Plugin[] {
    return this.clones.concat(this).map((html) => {
      return new HtmlWebpackPlugin(html.config);
    });
  }
}
