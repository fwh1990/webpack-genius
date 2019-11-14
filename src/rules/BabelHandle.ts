import { RuleHandle } from './RuleHandle';
import { RuleSetLoader } from 'webpack';

export interface BabelOptions {
  'babel-loader': {
    cacheDirectory: string;
    plugins: Array<[string] | [string, Record<string, any>]>;
    presets: Array<[string] | [string, Record<string, any>]>;
  };
}

export abstract class BabelHandle<T extends BabelOptions = BabelOptions> extends RuleHandle<T> {
  onInit() {
    super.onInit();

    if (this.genius.hasPackage('antd')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push([
          'import',
          {
            libraryName: 'antd',
            style: true,
          },
        ]);
      });
    }

    if (this.genius.hasPackage('antd-mobile')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push([
          'import',
          {
            libraryName: 'antd-mobile',
            style: true,
          },
        ]);
      });
    }

    if (this.genius.isDev() && this.genius.hasPackage('react')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push(['react-hot-loader/babel']);
      });
    }

    if (this.genius.isProd() && this.genius.hasPackage('lodash')) {
      this.setOptions('babel-loader', (options) => {
        options.plugins?.push([
          'import',
          {
            libraryName: 'lodash',
            libraryDirectory: '',
            camel2DashComponentName: false,
          },
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
        loader: 'babel-loader',
        options: {
          cacheDirectory: this.genius.isDev(),
          plugins: [
            [
              '@babel/plugin-syntax-dynamic-import',
            ],
            [
              '@babel/plugin-proposal-class-properties',
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
}
