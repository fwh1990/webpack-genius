import { PluginHandle } from './PluginHandle';
import { WebpackPluginInstance } from 'webpack';
import ProgressBarPlugin from 'webpackbar';

export class ProgressBar extends PluginHandle {
  collect(): WebpackPluginInstance[] {
    return [
      new ProgressBarPlugin({}),
    ];
  }
}
