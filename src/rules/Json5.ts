import { RuleHandle, RuleSetLoader } from './RuleHandle';
import { RuleSetCondition } from 'webpack';

interface Json5Options {
  'json5-loader': {
    esModule: boolean;
  };
}

export class Json5 extends RuleHandle<Json5Options> {
  protected test(): RuleSetCondition {
    return /\.json5$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'json5-loader',
        options: {
          esModule: true,
        },
      }
    ];
  }
}
