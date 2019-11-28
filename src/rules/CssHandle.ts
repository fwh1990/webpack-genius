import { RuleHandle } from './RuleHandle';
import { RuleSetLoader } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';

export interface CssOptions {
  'style-loader': {};
  'css-loader': {
    modules: boolean;
  };
  'postcss-loader': {
    ident: string;
    plugins: any[];
  };
}

export abstract class CssHandle<T extends CssOptions = CssOptions> extends RuleHandle<T> {
  protected onInit() {
    super.onInit();

    if (this.genius.isHot()) {
      this.addLoaderBefore(
        {
          loader: 'style-loader',
        },
        'css-loader'
      );
    } else {
      this.addLoaderBefore(
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // Relative position between css and image
            publicPath: '../',
          },
        },
        'css-loader',
      );
    }
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          // https://github.com/postcss/postcss-loader#plugins
          ident: 'postcss',
          plugins: [autoprefixer],
        },
      },
    ];
  }
}
