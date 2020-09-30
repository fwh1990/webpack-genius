import { CssHandle, CssOptions } from './CssHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

interface SassOptions extends CssOptions {
  'sass-loader': {
    sassOptions: {},
    additionalData: string | (() => string);
  };
}

export class Scss extends CssHandle<SassOptions> {
  additionalData(data: string | (() => string)): this {
    return this.setOptions('sass-loader', (options) => {
      options.additionalData = data;
    });
  }

  protected test(): RuleSetCondition {
    return /\.s[ac]ss$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return super.loaders().concat([
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            implementation: require(require.resolve('sass')),
            fiber: require(require.resolve('fibers')),
          },
        },
      },
    ]);
  }
}
