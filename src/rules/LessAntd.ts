import { RuleSetCondition, RuleSetLoader } from 'webpack';
import { resolve } from 'path';
import { Less } from './Less';


export class LessAntd extends Less {
  public theme(theme: object): this {
    this.setOptions('less-loader', (options) => {
      options.modifyVars = theme;
    });

    return this;
  }

  protected test(): RuleSetCondition {
    return /\.less$/;
  }

  protected exclude() {
    return undefined;
  }

  protected include() {
    return resolve('./node_modules/antd/');
  }

  protected loaders(): RuleSetLoader[] {
    return super.loaders().concat([
      {
        loader: 'less-loader',
        options: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    ]);
  }
}
