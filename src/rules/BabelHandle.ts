import { RuleHandle, RuleSetLoader } from './RuleHandle';
import { RuleSetRule } from 'webpack';
import path from 'path';

export interface BabelOptions {
  'thread-loader': {
    workers: number;
    workerParallelJobs: number;
    poolTimeout: number;
  };
  'babel-loader': {
    plugins: Array<[string] | [string, Record<string, any>] | [string, Record<string, any>, string]>;
    presets: Array<[string] | [string, Record<string, any>]>;
  };
}

export abstract class BabelHandle<T extends BabelOptions = BabelOptions> extends RuleHandle<T> {
  onInit() {
    super.onInit();

    ['antd', 'antd-mobile'].forEach((item) => {
      if (this.genius.hasPackage(item)) {
        this.addBabelPlugin([
          'babel-plugin-import',
          {
            libraryName: item,
            libraryDirectory: 'lib',
            camel2DashComponentName: true,
            style: true,
          },
          item,
        ]);
      }
    });

    if (this.genius.isHot() && this.genius.hasPackage('react')) {
      this.addBabelPlugin(['react-refresh/babel']);
    }

    if (this.genius.isHot()) {
      this.addBabelPlugin([
        path.join(__dirname, '..', 'misc', 'module-hot.js'),
        {
          entries: [],
        },
      ]);
    }

    if (this.genius.isBuild() && this.genius.hasPackage('@ant-design/icons')) {
      this.addBabelPlugin([
        'babel-plugin-import',
        {
          libraryName: '@ant-design/icons',
          libraryDirectory: 'lib/icons',
          camel2DashComponentName: false,
          style: false,
        },
        '@ant-design/icons',
      ]);
    }

    if (this.genius.isBuild() && this.genius.hasPackage('lodash')) {
      this.addBabelPlugin(['babel-plugin-lodash']);
    }

    if (this.genius.hasPackage('react')) {
      // const version = require('react').version.split('.');

      // const major = Number(version[0]);
      // const minor = Number(version[1]);
      // let runtime = 'classic';

      // // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
      // if (major >= 17 || major === 16 && minor >= 14 || major === 15 && minor >= 7) {
      //   runtime = 'automatic';
      // }

      this.addBabelPreset(['@babel/preset-react', {
        // starting from Babel 8, "automatic" will be the default runtime.
        runtime: 'automatic',
      }]);
    }
  }

  public addBabelPlugin(plugin: [string] | [string, Record<string, any>] | [string, Record<string, any>, string]): this {
    this.setOptions('babel-loader', (loader) => {
      loader.plugins?.push(plugin);
    });

    return this;
  }

  public addBabelPreset(preset: [string] | [string, Record<string, any>]): this {
    this.setOptions('babel-loader', (loader) => {
      loader.presets?.push(preset);
    });

    return this;
  }

  protected resetEntries() {
    let list: string[] = [];
    const entries = this.genius.getOriginalEntry();

    if (entries) {
      if (typeof entries === 'object') {
        Object.keys(entries).forEach((key) => {
          if (Array.isArray(entries[key])) {
            list.push(...entries[key]);
          } else {
            list.push(entries[key]);
          }
        });
      } else if (typeof entries === 'string') {
        list.push(entries);
      } else if (typeof entries === 'function') {
        // TODO implements
      }

      list = list.map((item) => path.resolve(item));
    }

    this.setOptions('babel-loader', (loader) => {
      const plugin = loader.plugins?.find((item) => ~item[0].indexOf('module-hot.js'));

      if (plugin && plugin[1]) {
        plugin[1].entries = list;
      }
    });
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 50,
          poolTimeout: this.genius.isHot() ? Infinity : 500,
        },
      },
      {
        loader: 'babel-loader',
        options: {
          // Disable file babel.config.js
          configFile: false,
          // Disable file .babelrc ??
          babelrc: false,
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                decoratorsBeforeExport: true,
              },
            ],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: false,
              },
            ],
            [
              '@babel/plugin-proposal-optional-chaining',
              {
                loose: false,
              },
            ],
            [
              '@babel/plugin-proposal-nullish-coalescing-operator',
              {
                loose: false,
              },
            ],
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: { version: 3, proposals: true },
                helpers: this.genius.isBuild(),
                regenerator: true,
                useESModules: false,
              },
            ]
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                // Use @babel/plugin-transform-runtime instead
                useBuiltIns: false,
                // Warn: only has an effect when used alongside useBuiltIns: 'usage' or useBuiltIns: 'entry'
                // corejs: 3,
                loose: true,
                modules: false,
              },
            ],
          ],
        },
      },
    ];
  }

  public collect(): RuleSetRule {
    this.setOptions('babel-loader', (options) => {
      options.plugins?.forEach((item) => {
        item[0] = require.resolve(item[0]);
      });

      options.presets?.forEach((item) => {
        item[0] = require.resolve(item[0]);
      });
    });

    this.resetEntries();

    return super.collect();
  }
}
