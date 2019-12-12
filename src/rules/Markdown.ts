import { RuleSetCondition, RuleSetLoader } from 'webpack';
import { Renderer } from 'marked';
import { RuleHandle } from './RuleHandle';
import highlight from 'highlight.js';

interface Options {
  'markdown-loader': {};
}

export class Markdown extends RuleHandle<Options> {
  protected test(): RuleSetCondition {
    return /\.md$/;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'html-loader',
      },
      {
        loader: 'markdown-loader',
        options: {
          renderer: new Renderer(),
          // Inject    import 'highlight.js/styles/github.css';     to your entry file.
          highlight: (code: string, lang: string) => {
            if (lang && highlight.getLanguage(lang)) {
              return highlight.highlight(lang, code, true).value;
            }

            return highlight.highlightAuto(code).value;
          },
        },
      },
    ];
  }
}
