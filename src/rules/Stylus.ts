import { CssHandle } from './CssHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

export class Stylus extends CssHandle {
  protected test(): RuleSetCondition {
    return /\.styl$/;
  }

  protected loaders(): RuleSetLoader[] {
    return super.loaders().concat([
      {
        loader: 'stylus-loader',
      },
    ]);
  }
}
