import { CssHandle } from './CssHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

export class Scss extends CssHandle {
  protected test(): RuleSetCondition {
    return /\.s[ac]ss$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return super.loaders().concat([
      {
        loader: 'sass-loader',
      },
    ]);
  }
}
