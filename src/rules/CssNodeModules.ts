import { Css } from './Css';

export class CssNodeModules extends Css {
  protected onInit() {
    super.onInit();
    this.disableCssModules();
  }

  protected exclude() {
    return undefined;
  }

  protected include() {
    return /node_modules/;
  }
}
