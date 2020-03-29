import { RuleHandle } from './RuleHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

export class Html extends RuleHandle {
  protected test(): RuleSetCondition {
    return /\.html?$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'html-loader',
        options: {
          attributes: [
            'img:src',
            'link:href',
            'audio:src',
            'video:src',
          ],
          esModule: false,
          // Mini by html-webpack-plugin
          minimize: false,
        },
      }
    ];
  }
}
