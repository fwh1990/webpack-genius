import { Plugin } from 'webpack';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import { PluginHandle } from './PluginHandle';

export class AntdDayJs extends PluginHandle {
  public collect(): Plugin[] {
    const config: Record<string, any> = {};

    try {
      const antdVersion = require('antd/package.json').version.split('.')[0];

      if (antdVersion < 4) {
        config.preset = 'antdv3';
      }
    } catch {
      return [];
    }

    return [
      new AntdDayjsWebpackPlugin(config),
    ];
  }
}
