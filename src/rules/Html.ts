import { RuleHandle, RuleSetLoader } from './RuleHandle';
import { RuleSetCondition } from 'webpack';

export class Html extends RuleHandle {
  protected test(): RuleSetCondition {
    return /\.html?$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'html-loader',
        options: {
          attributes: {
            root: '.',
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
              },
              {
                tag: 'audio',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'video',
                attribute: 'src',
                type: 'src',
              },
            ],
          },
          esModule: false,
          // Mini by html-webpack-plugin
          minimize: false,
        },
      }
    ];
  }
}
