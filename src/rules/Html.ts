import { RuleHandle, RuleSetLoader } from './RuleHandle';
import { RuleSetCondition } from 'webpack';

export class Html extends RuleHandle {
  protected test(): RuleSetCondition {
    return /\.html?$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'html-loader',
        options: {
          attributes: true,
          // https://github.com/webpack-contrib/html-loader#esmodule
          esModule: false,
          // Mini by html-webpack-plugin
          minimize: false,
        },
      }
    ];
  }
}
