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
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push([
          'babel-plugin-import',
          {
            libraryName: 'antd',
            style: true,
          },
          'antd',
        ]);
      });
    }

    if (this.genius.hasPackage('antd-mobile')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push([
          'babel-plugin-import',
          {
            libraryName: 'antd-mobile',
            style: true,
          },
          'antd-mobile',
        ]);
      });
    }

    if (this.genius.isHot() && this.genius.hasPackage('react')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push(['react-hot-loader/babel']);
        options.plugins?.push([path.join(__dirname, '..', 'misc', 'react-hot-loader-injection.js')]);
      });
    }

    if (this.genius.isBuild() && this.genius.hasPackage('lodash')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push([
          'babel-plugin-import',
          {
            libraryName: 'lodash',
            libraryDirectory: '',
            camel2DashComponentName: false,
          },
          'lodash',
        ])
      });
    }

    if (this.genius.hasPackage('react')) {
      this.setOptions('babel-loader', (options) => {
        options.presets?.push(['@babel/preset-react']);
      });
    }

    if (this.genius.hasPackage('typescript')) {
      this.setOptions('babel-loader', (options) => {
        options.presets?.push(['@babel/preset-typescript']);
      });
    }
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
