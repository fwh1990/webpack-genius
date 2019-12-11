import fs from 'fs';
import path from 'path';
import { WebpackGenius } from '../WebpackGenius';

export const getEntry = (genius: WebpackGenius): string => {
  let entry: string = genius.getPackageField('main');

  if (entry && fs.existsSync(entry)) {
    return entry;
  }

  for (const name of ['index', 'Index', 'src/index', 'src/Index']) {
    for (const ext of ['.js', '.ts', '.jsx', '.tsx']) {
      entry = path.resolve(name + ext);

      if (fs.existsSync(entry)) {
        return entry;
      }
    }
  }

  return '';
};
