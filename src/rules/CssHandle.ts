import { RuleHandle } from './RuleHandle';
import { RuleSetLoader } from 'webpack';
import { Plugin } from 'postcss';
import autoprefixer from 'autoprefixer';

export interface CssOptions {
  'cache-loader': {};
  'style-loader': {};
  'css-loader': {
    modules: boolean;
    esModule: boolean;
    sourceMap: boolean;
  };
  'postcss-loader': {
    ident: string;
    plugins: Plugin<any>[];
    sourceMap:  boolean;
  };
}

export abstract class CssHandle<T extends CssOptions = CssOptions> extends RuleHandle<T> {
  public disableCssModules(): this {
    this.setOptions('css-loader', (options) => {
      options.modules = false;
    });

    return this;
  }

  public addPostCssPlugin(plugin: Plugin<any>): this {
    this.setOptions('postcss-loader', (options) => {
      options.plugins?.push(plugin);
    });

    return this;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          esModule: false,
          sourceMap: this.genius.isHot(),
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          // https://github.com/postcss/postcss-loader#plugins
          ident: 'postcss-' + this.constructor.name,
          plugins: [autoprefixer()],
          sourceMap: this.genius.isHot(),
        },
      },
    ];
  }
}
