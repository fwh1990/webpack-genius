import { DefinePlugin, WebpackPluginInstance } from 'webpack';
import { PluginHandle } from './PluginHandle';

export class Define extends PluginHandle {
  protected readonly definition = {};

  public add(key: string, value: string | number | boolean): this {
    this.definition[key] = JSON.stringify(value);

    return this;
  }

  public addEnv(envKey: string, value: string | number | boolean): this {
    return this.add(`process.env.${envKey}`, value);
  }

  collect(): WebpackPluginInstance[] {
    for (const key in this.definition) {
      if (this.definition.hasOwnProperty(key)) {
        return [
          new DefinePlugin(this.definition),
        ];
      }
    }

    return [];
  }
}
