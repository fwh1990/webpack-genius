import { RuleHandle } from './RuleHandle';
import { RuleSetCondition, RuleSetLoader } from 'webpack';

interface AssetOptions {
  'url-loader': {
    limit: number;
    name: string;
    esModules: boolean;
  };
}

export class Asset extends RuleHandle<AssetOptions> {
  protected test(): RuleSetCondition {
    return /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|eot|ttf|mp3)$/i;
  }

  protected loaders(): RuleSetLoader[] {
    return [
      {
        loader: 'url-loader',
        options: {
          // Transform to bese64
          limit: 2048,
          name: 'assets/[name].[hash:12].[ext]',
          esModules: false,
        },
      }
    ];
  }
}
