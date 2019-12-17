import { PluginHandle } from './PluginHandle';
import { Plugin } from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import colors from 'colors';

export class ProgressBar extends PluginHandle {
  collect(): Plugin[] {
    return [
      new ProgressBarPlugin({
        format: '[:bar] ' + colors.green.bold(':percent') + ' (:elapsed seconds) :msg',
      }),
    ];
  }
}
