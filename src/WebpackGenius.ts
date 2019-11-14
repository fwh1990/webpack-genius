import fs from 'fs';
import path from 'path';
import { Configuration, Output, Options, Resolve, Plugin, RuleSetRule } from 'webpack';
import clonedeep from 'lodash.clonedeep';
import { HotModule } from './plugins/HotModule';
import { PluginHandle } from './plugins/PluginHandle';
import { HardSource } from './plugins/HardSource';
import { HashedModuleIds } from './plugins/HashedModuleIds';
import { Html as HtmlPlugin } from './plugins/Html';
import { Html as HtmlRule } from './rules/Html';
import { Clean } from './plugins/Clean';
import { MiniCss } from './plugins/MiniCss';
import WebpackDevServer from 'webpack-dev-server';
import { RuleHandle } from './rules/RuleHandle';
import { Tsx } from './rules/Tsx';
import { Jsx } from './rules/Jsx';
import { Css } from './rules/Css';
import { Scss } from './rules/Scss';
import { Less } from './rules/Less';
import { LessAntd } from './rules/LessAntd';
import { Asset } from './rules/Asset';

const packageFile: {
   dependencies: Record<string, string>;
   devDependencies: Record<string, string>;
   main: string;
   } = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

export class WebpackGenius {
  private readonly config: Configuration = {
    output: {},
    stats: {},
    resolve: {},
    entry: [],
    plugins: [],
    devServer: {},
    module: {
      rules: [],
    },
    optimization: {},
  };

  private readonly plugins: Record<string, PluginHandle> = {};
  private readonly rules: Record<string, RuleHandle> = {};

  private readonly environment: string;

  private readonly port: number;

  public constructor(environment: string, port: number) {
    this.environment = environment || 'development';
    this.port = port;
  }

  public hasPackage(name: string): boolean {
    return !!packageFile.dependencies[name] || !!packageFile.devDependencies[name];
  }

  public getPackageField(name: string): any {
    return packageFile[name];
  }

  public getPort(): number {
    return this.port;
  }

  public getEnvironment(): string {
    return this.environment;
  }

  public isProd(): boolean {
    return this.environment === 'production';
  }

  public isDev(): boolean {
    return this.environment === 'development';
  }

  public switchChunkHash(hashNumber: number = 10): string {
    if (this.environment === 'development') {
      return 'chunkhash.[id]';
    }

    return `[chunkhash:${hashNumber}]`;
  }

  public switchContentHash(hashNumber: number = 10): string {
    if (this.environment === 'development') {
      return 'contenthash.[id]';
    }

    return `[contenthash:${hashNumber}]`;
  }

  public target(target: Configuration['target']): this {
    this.config.target = target;

    return this;
  }

  public devtool(devtool: Options.Devtool | ((webpack: this) => Options.Devtool)): this {
    this.config.devtool = typeof devtool === 'function' ? devtool(this) : devtool;

    return this;
  }

  public mode(mode: Configuration['mode'] | ((webpack: this) => Configuration['mode'])): this {
    this.config.mode = typeof mode === 'function' ? mode(this) : mode;

    return this;
  }

  public optimization(fn: (optimization: Options.Optimization, webpack: this) => Options.Optimization | void): this {
    const result = fn(this.config.optimization!, this);

    if (typeof result === 'object') {
      this.config.optimization = clonedeep(result);
    }

    return this;
  }

  public output(fn: (output: Output, webpack: this) => Output | void): this {
    const result = fn(this.config.output!, this);

    if (typeof result === 'object') {
      this.config.output = clonedeep(result);
    }

    return this;
  }

  public miniCss(is: boolean): this {
    if (!is) {
      return this;
    }

    this.pluginMiniCss();

    this.optimization((optimization) => {
      const chunks = optimization.splitChunks as Options.SplitChunksOptions;

      if (!chunks.cacheGroups) {
        chunks.cacheGroups = {};
      }

      Object.assign(chunks.cacheGroups, {
        // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
      });
    });

    return this;
  }

  public devServer(fn: (server: WebpackDevServer.Configuration, webpack: this) => WebpackDevServer.Configuration | void): this {
    const result = fn(this.config.devServer!, this);

    if (typeof result === 'object') {
      this.config.devServer = clonedeep(result);
    }

    return this;
  }

  public stats(fn: (stats: Options.Stats, webpack: this) => Options.Stats | void): this {
    const result = fn(this.config.stats!, this);

    if (typeof result === 'object') {
      this.config.stats = clonedeep(result);
    }

    return this;
  }

  public entry(entry: Configuration['entry']): this {
    this.config.entry = clonedeep(entry);

    return this;
  }

  public resolve(fn: (resolve: Resolve, webpack: this) => Resolve | void): this {
    const result = fn(this.config.resolve!, this);

    if (typeof result === 'object') {
      this.config.resolve = clonedeep(result);
    }

    return this;
  }

  public addPlugin(plugin: Plugin): this {
      this.config.plugins?.push(plugin);

      return this;
  }

  public pluginHotModuleReplace(fn?: (plugin: HotModule) => void): this {
    const plugin = this.findPlugin('hot-module-replace', () => new HotModule(this));

    fn?.(plugin);

    return this;
  }

  public pluginHardSource(fn?: (plugin: HardSource) => void): this {
    const plugin = this.findPlugin('hard-source', () => new HardSource(this));

    fn?.(plugin);

    return this;
  }

  public pluginHtml(fn?: (plugin: HtmlPlugin) => void): this {
    const plugin = this.findPlugin('html', () => new HtmlPlugin(this));

    fn?.(plugin);

    return this;
  }

  public pluginHashedModule(fn?: (plugin: HashedModuleIds) => void): this {
    const plugin = this.findPlugin('hashed-module', () => new HashedModuleIds(this));

    fn?.(plugin);

    return this;
  }

  public pluginClean(fn?: (plugin: Clean) => void): this {
    const plugin = this.findPlugin('clean', () => new Clean(this));

    fn?.(plugin);

    return this;
  }

  public pluginMiniCss(fn?: (plugin: MiniCss) => void): this {
    const plugin = this.findPlugin('mini-css', () => new MiniCss(this));

    fn?.(plugin);

    return this;
  }

  public addRule(rule: RuleSetRule): this {
    this.config.module?.rules.push(rule);

    return this;
  }

  public ruleTsx(fn?: (rule: Tsx) => void): this {
    const rule = this.findRule('tsx', () => new Tsx(this));

    fn?.(rule);

    return this;
  }

  public ruleJsx(fn?: (rule: Jsx) => void): this {
    const rule = this.findRule('jsx', () => new Jsx(this));

    fn?.(rule);

    return this;
  }

  public ruleCss(fn?: (rule: Css) => void): this {
    const rule = this.findRule('css', () => new Css(this));

    fn?.(rule);

    return this;
  }

  public ruleScss(fn?: (rule: Scss) => void): this {
    const rule = this.findRule('scss', () => new Scss(this));

    fn?.(rule);

    return this;
  }

  public ruleLess(fn?: (rule: Less) => void): this {
    const rule = this.findRule('less', () => new Less(this));

    fn?.(rule);

    return this;
  }

  public ruleLessAntd(fn?: (rule: LessAntd) => void): this {
    const rule = this.findRule('less-antd', () => new LessAntd(this));

    fn?.(rule);

    return this;
  }

  public ruleAsset(fn?: (rule: Asset) => void): this {
    const rule = this.findRule('asset', () => new Asset(this));

    fn?.(rule);

    return this;
  }

  public ruleHtml(fn?: (rule: HtmlRule) => void): this {
    const rule = this.findRule('html', () => new HtmlRule(this));

    fn?.(rule);

    return this;
  }

  protected findPlugin<T extends PluginHandle>(name: string, or: () => T): T {
    this.plugins[name] = this.plugins[name] || or();

    return this.plugins[name] as T;
  }

  protected findRule<T extends RuleHandle>(name: string, or: () => T): T {
    this.rules[name] = this.rules[name] || or();

    return this.rules[name] as T;
  }

  public collect() {
    const config = clonedeep(this.config);

    Object.values(this.plugins).forEach((plugin) => {
      if (plugin.isUsed()) {
        config.plugins?.push(...plugin.collect());
      }
    });

    Object.values(this.rules).forEach((rule) => {
      if (rule.isUsed()) {
        config.module?.rules.push(rule.collect());
      }
    });

    return config;
  }
}
