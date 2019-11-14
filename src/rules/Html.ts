import { RuleHandle } from './RuleHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

export class Html extends RuleHandle {
  protected test(): RuleSetCondition {
    return /\.html?$/;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'html-loader',
        options: {
          attrs: [
            'img:src',
            'link:href',
            'audio:src',
            'video:src',
          ],
        },
      }
    ];
  }
}
