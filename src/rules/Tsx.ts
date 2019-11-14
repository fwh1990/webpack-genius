import { BabelHandle } from './BabelHandle';
import { RuleSetCondition } from 'webpack';

export class Tsx extends BabelHandle {
  protected test(): RuleSetCondition {
    return /\.tsx?$/;
  }
}
