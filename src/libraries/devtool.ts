import { WebpackGenius } from '../WebpackGenius';
import { Options } from 'webpack';

export const setDevtool = (genius: WebpackGenius): Options.Devtool => {
  return genius.isProd() ? false : 'eval';
};