import { CssHandle } from './CssHandle';
import { RuleSetCondition } from 'webpack';

export class Css extends CssHandle {
  protected test(): RuleSetCondition {
    return /\.css$/i;
  }
}
