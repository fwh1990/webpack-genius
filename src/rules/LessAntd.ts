import path from 'path';
import { Less } from './Less';

export class LessAntd extends Less {
  protected onInit() {
    super.onInit();

    this.setOptions('css-loader', (options) => {
      options.modules = false;
    });

    this.setOptions('less-loader', (options) => {
      options.modifyVars = {};
      options.javascriptEnabled = true;
    });
  }

  public theme(theme: object): this {
    this.setOptions('less-loader', (options) => {
      options.modifyVars = theme;
    });

    return this;
  }

  protected exclude() {
    return undefined;
  }

  protected include() {
    return path.resolve('./node_modules/antd/');
  }
}
