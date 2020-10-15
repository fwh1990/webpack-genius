import { RuleHandle, RuleSetLoader } from './RuleHandle';
import { RuleSetCondition } from 'webpack';

interface AssetOptions {
  'url-loader': {
    limit: number | string | boolean;
    name: string;
    esModule: boolean;
  };
}

export class Asset extends RuleHandle<AssetOptions> {
  protected test(): RuleSetCondition {
    return /\.(png|jpe?g|gif|ico|svg|webp|woff2?|eot|ttf|mp3|mp4|wav|swf|pdf|zip|rar|gz|tar)$/i;
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
          name: `assets/[name].${this.genius.switchContentHash()}.[ext]`,
          esModule: false,
        },
      }
    ];
  }
}
