import { BabelHandle } from './BabelHandle';
import { RuleSetCondition } from 'webpack';

export class Tsx extends BabelHandle {
  onInit() {
    super.onInit();
    this.addBabelPreset(['@babel/preset-typescript']);
  }

  protected test(): RuleSetCondition {
    return /\.tsx?$/i;
  }
}
