import { RuleHandle } from './RuleHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

interface AssetOptions {
  'url-loader': {
    limit: number | string | boolean;
    name: string;
    esModule: boolean;
  };
}

export class Asset extends RuleHandle<AssetOptions> {
  protected test(): RuleSetCondition {
    return /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|eot|ttf|mp3)$/i;
  }

  public base64Limit(limit: number | string | boolean): this {
    this.setOptions('url-loader', (option) => {
      option.limit = limit;
    });

    return this;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'url-loader',
        options: {
          // Transform to base64
          limit: this.genius.isBuild() ? 2048 : false,
          name: 'assets/[name].[hash:12].[ext]',
          esModule: false,
        },
      }
    ];
  }
}
