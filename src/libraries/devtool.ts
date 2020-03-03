import { WebpackGenius } from '../WebpackGenius';
import { Options } from 'webpack';

export const setDevtool = (genius: WebpackGenius): Options.Devtool => {
  return genius.isBuild() ? 'nosources-source-map' : 'cheap-eval-source-map';
};
