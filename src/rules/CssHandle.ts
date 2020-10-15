import { RuleHandle, RuleSetLoader } from './RuleHandle';
import { RuleSetRule } from 'webpack';
import { Plugin } from 'postcss';
import { cosmiconfigSync } from 'cosmiconfig';
import { findConfig } from 'browserslist/node';

export interface CssOptions {
  'style-loader': {};
  'css-loader': {
    modules: boolean;
    esModule: boolean;
    sourceMap: boolean;
    importLoaders: number;
  };
  'postcss-loader': {
    sourceMap:  boolean;
    postcssOptions: {
      plugins: (Plugin | string | [string, object])[];
    }
  };
}

export abstract class CssHandle<T extends CssOptions = CssOptions> extends RuleHandle<T> {
  public disableCssModules(): this {
    this.setOptions('css-loader', (options) => {
      options.modules = false;
    });

    return this;
  }

  public addPostCssPlugin(plugin: Plugin | string | [string, object]): this {
    this.setOptions('postcss-loader', (options) => {
      const plugins = options.postcssOptions!.plugins = options.postcssOptions!.plugins || [];
      plugins.push(plugin);
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
          sourceMap: this.genius.isHot(),
          postcssOptions: {},
        },
      },
    ];
  }

  protected valiatePostcss() {
    this.setOptions('postcss-loader', (options) => {
      // should have browserslist configuration file.
      // User didn't set plugins into loader directly.
      if (!options.postcssOptions!.plugins) {
        const postcssConfigFile = cosmiconfigSync('postcss').search(process.cwd());
        const browserslistConfig = findConfig(process.cwd());

        // User didn't add postcss configuration file.
        if (postcssConfigFile === null) {
          if (browserslistConfig) {
            options.postcssOptions!.plugins = [require.resolve('autoprefixer')];
          } else {
            // Just disable postcss-loader to against warning
            this.disableLoader('postcss-loader');
          }
        }
      }
    });
  }

  protected setCssImportLoaders() {
    const total = this.rule.use!.length;
    const index = this.rule.use!.findIndex((item) => (item as RuleSetLoader).loader === 'css-loader');

    if (~index) {
      this.setOptions('css-loader', (options) => {
        options.importLoaders = total - index - 1;
      });
    }
  }

  public/*protected*/ collect(): RuleSetRule {
    this.valiatePostcss();
    this.setCssImportLoaders();

    return super.collect();
  }
}
