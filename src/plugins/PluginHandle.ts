import { Plugin } from 'webpack';
import { WebpackGenius } from '../WebpackGenius';

export abstract class PluginHandle {
  protected readonly genius: WebpackGenius;
  private status: boolean = true;

  constructor(genius: WebpackGenius) {
    this.genius = genius;
  }

  public enable(enable: boolean): this {
    this.status = enable;

    return this;
  }

  public isUsed(): boolean {
    return this.status;
  }

  public abstract collect(): Plugin[];
}
