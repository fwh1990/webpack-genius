import fs from 'fs';
import path from 'path';

export const getHtmlTemplate = (): string => {
  for (const name of ['index', 'public/index', 'src/index', 'src/public/index', 'assets/index', 'src/assets/index']) {
    for (const ext of ['.html', 'htm']) {
      const template = path.resolve(name + ext);

      if (fs.existsSync(template)) {
        return template;
      }
    }
  }

  return '';
};
