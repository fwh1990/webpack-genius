import { RuleHandle } from './RuleHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

export class AliasReactDom extends RuleHandle {
  protected test(): RuleSetCondition {
    return /\.js$/;
  }

  protected exclude(): RuleSetCondition | undefined {
    return undefined;
  }

  protected include(): RuleSetCondition | undefined {
    return /node_modules[\\\/]react-dom/;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'react-hot-loader/webpack',
      }
    ];
  }
}
