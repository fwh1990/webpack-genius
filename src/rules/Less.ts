import { CssHandle, CssOptions } from './CssHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

interface LessOptions extends CssOptions {
  'less-loader': {
    lessOptions: {
      modifyVars: object | string;
      javascriptEnabled: boolean;
    },
    additionalData: string | (() => string);
  };
}

export class Less extends CssHandle<LessOptions> {
  additionalData(data: string | (() => string)): this {
    return this.setOptions('less-loader', (options) => {
      options.additionalData = data;
    });
  }

  protected test(): RuleSetCondition {
    return /\.less$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return super.loaders().concat([
      {
        loader: 'less-loader',
        options: {
          lessOptions: {},
        },
      },
    ]);
  }
}
