import { BabelHandle } from './BabelHandle';
import { RuleSetCondition } from 'webpack';

export class Jsx extends BabelHandle {
  protected test(): RuleSetCondition {
    return /\.jsx?$/;
  }
}
