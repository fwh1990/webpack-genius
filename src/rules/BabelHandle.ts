import { RuleHandle } from './RuleHandle';
import { RuleSetLoader, RuleSetRule } from 'webpack';
import path from 'path';

export interface BabelOptions {
  'thread-loader': {
    workers: number;
    workerParallelJobs: number;
    poolTimeout: number;
  };
  'babel-loader': {
    cacheCompression: boolean;
    cacheDirectory: string | boolean;
    plugins: Array<[string] | [string, Record<string, any>] | [string, Record<string, any>, string]>;
    presets: Array<[string] | [string, Record<string, any>]>;
  };
}

export abstract class BabelHandle<T extends BabelOptions = BabelOptions> extends RuleHandle<T> {
  onInit() {
    super.onInit();

    if (this.genius.hasPackage('antd')) {
      this.addBabelPlugin([
        'babel-plugin-import',
        {
          libraryName: 'antd',
          style: true,
        },
        'antd',
      ]);
    }

    if (this.genius.hasPackage('antd-mobile')) {
      this.addBabelPlugin([
        'babel-plugin-import',
        {
          libraryName: 'antd-mobile',
          style: true,
        },
        'antd-mobile',
      ]);
    }

    if (this.genius.isHot() && this.genius.hasPackage('react')) {
      this
        .addBabelPlugin(['react-hot-loader/babel'])
        .addBabelPlugin([path.join(__dirname, '..', 'misc', 'react-hot-loader-injection.js')]);
    }

    if (this.genius.isBuild() && this.genius.hasPackage('lodash')) {
      this.addBabelPlugin([
        'babel-plugin-import',
        {
          libraryName: 'lodash',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'lodash',
      ]);
    }

    if (this.genius.hasPackage('react')) {
      this.addBabelPreset(['@babel/preset-react']);
    }

    if (this.genius.hasPackage('typescript')) {
      this.addBabelPreset(['@babel/preset-typescript']);
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

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 50,
          poolTimeout: 2000,
        },
      },
      {
        loader: 'babel-loader',
        options: {
          // Disable file babel.config.js
          configFile: false,
          // Disable file .babelrc ??
          babelrc: false,
          cacheCompression: false,
          cacheDirectory: this.genius.isHot(),
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true,
              },
            ],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true,
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
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
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

    return super.collect();
  }
}
