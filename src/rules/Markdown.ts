import { RuleSetCondition, RuleSetLoader } from 'webpack';
import { Renderer } from 'marked';
import { RuleHandle } from './RuleHandle';

export class Markdown extends RuleHandle {
  protected test(): RuleSetCondition {
    return /\.md$/;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'html-loader',
      },
      {
        loader: 'markdown-loader',
        options: {
          pedantic: true,
          renderer: new Renderer(),
        },
      }
    ];
  }
}
