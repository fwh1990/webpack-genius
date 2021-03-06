import path from 'path';
import { WebpackPluginInstance } from 'webpack';
import { PluginHandle } from './PluginHandle';
import HtmlWebpackPlugin, { MinifyOptions } from 'html-webpack-plugin';

export class Html extends PluginHandle {
  protected readonly clones: Html[] = [];
  protected config: HtmlWebpackPlugin.Options = {
    meta: false,
    title: this.genius.getPackageField('description') || this.genius.getPackageField('name'),
    minify: this.genius.isHot() ? false : {
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
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
      minify: typeof config.minify === 'object'
        ? {
          ...this.config.minify as MinifyOptions,
          ...config.minify,
        }
        : config.minify,
    };

    return this;
  }

  public clone(): Html {
    const plugin = new Html(this.genius);
    this.clones.push(plugin);

    return plugin;
  }

  public collect(): WebpackPluginInstance[] {
    return this.clones.concat(this).map((html) => {
      return new HtmlWebpackPlugin(html.config);
    });
  }
}
