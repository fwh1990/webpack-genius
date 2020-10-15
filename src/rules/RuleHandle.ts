import { WebpackGenius } from '../WebpackGenius';
import { RuleSetRule, RuleSetCondition } from 'webpack';

export interface RuleSetLoader {
  /**
   * Unique loader options identifier.
   */
  ident?: string;
  /**
   * Loader name.
   */
  loader: string;
  /**
   * Loader options.
   */
  options?: string | { [index: string]: any };
}

export abstract class RuleHandle<T = any> {
  protected readonly genius: WebpackGenius;
  private status: boolean = true;
  protected rule: RuleSetRule & { use?: RuleSetLoader[] } = {};

  constructor(genius: WebpackGenius) {
    this.genius = genius;
    this.rule.test = this.test();
    this.rule.exclude = this.exclude();
    this.rule.include = this.include();
    this.rule.use = this.loaders();
    this.onInit();
  }

  protected onInit() {
    //
  }

  public removeLoader(name: string): this {
    this.rule.use = (this.rule.use as RuleSetLoader[]).filter((item) => {
      return !this.isLoaderEqual(item.loader, name);
    });

    return this;
  }

  public addLoaderBefore(loader: RuleSetLoader, beforeLoaderName?: string): this {
    if (this.exists(loader.loader)) {
      return this;
    }

    const index = (this.rule.use as RuleSetLoader[]).findIndex((item) => {
      return this.isLoaderEqual(item.loader, beforeLoaderName);
    });

    if (index === -1) {
      this.rule.use?.unshift(loader);
    } else {
      this.rule.use?.splice(index, 0, loader);
    }

    return this;
  }

  public addLoaderAfter(loader: RuleSetLoader, afterLoaderName?: string): this {
    if (this.exists(loader.loader)) {
      return this;
    }

    const index = (this.rule.use as RuleSetLoader[]).findIndex((item) => {
      return this.isLoaderEqual(item.loader, afterLoaderName);
    });

    if (index === -1) {
      this.rule.use?.push(loader);
    } else {
      this.rule.use?.splice(index + 1, 0, loader);
    }

    return this;
  }

  public enable(enable: boolean): this {
    this.status = enable;

    return this;
  }

  public isUsed(): boolean {
    return this.status;
  }

  public setInclude(value: RuleSetCondition): this {
    this.rule.include = value;
    return this;
  }

  public setExclude(value: RuleSetCondition): this {
    this.rule.exclude = value;
    return this;
  }

  public setOptions<U extends keyof T>(loaderName: U, fn: (options: Partial<T[U]>) => Partial<T[U]> | void): this {
    const loader = (this.rule.use as RuleSetLoader[]).find((item) => {
      return this.isLoaderEqual(item.loader, loaderName);
    });

    if (!loader) {
      throw new Error('Loader `' + loaderName + '` is not found.');
    }

    const result = fn(loader.options as Partial<T[U]>);

    if (result) {
      loader.options = result;
    }

    return this;
  };

  public disableLoader(loaderName: keyof T): this {
    this.rule.use = (this.rule.use as RuleSetLoader[]).filter((item) => {
      return !this.isLoaderEqual(item.loader, loaderName);
    });

    return this;
  }

  protected abstract test(): RuleSetCondition;

  protected abstract loaders(): RuleSetLoader[];

  protected exclude(): RuleSetCondition | undefined {
    return /node_modules/;
  }

  protected include(): RuleSetCondition | undefined {
    return undefined;
  }

  public/*protected*/ collect(): RuleSetRule {
    this.rule.use?.forEach((item: RuleSetLoader) => {
      item.loader = require.resolve(item.loader!);
    });

    return this.rule;
  }

  protected exists(loader?: string) {
    const index = (this.rule.use as RuleSetLoader[]).findIndex((item) => {
      return this.isLoaderEqual(item.loader, loader);
    });

    return index >= 0;
  }

  protected isLoaderEqual(loader?: string, search?: keyof T | string) {
    if (!search) {
      return false;
    }

    return loader === search || loader === require.resolve(String(search));
  }
}
