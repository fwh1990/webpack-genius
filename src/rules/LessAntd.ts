import path from 'path';
import { Less } from './Less';

export class LessAntd extends Less {
  protected onInit() {
    super.onInit();

    this.disableCssModules();
    this.setOptions('less-loader', (options) => {
      options.lessOptions!.modifyVars = {};
      options.lessOptions!.javascriptEnabled = true;
    });
  }

  public theme(theme: object): this {
    this.setOptions('less-loader', (options) => {
      options.lessOptions!.modifyVars = theme;
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
