import { WebpackGenius } from '../WebpackGenius';
import { Configuration } from 'webpack';

export const setDevtool = (genius: WebpackGenius): NonNullable<Configuration['devtool']> => {
  return genius.isBuild() ? 'nosources-source-map' : 'cheap-eval-source-map';
};
