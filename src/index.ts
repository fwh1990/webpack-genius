import './misc/module';
import { WebpackGenius } from "./WebpackGenius";
import { setOutput } from "./libraries/output";
import { setStats } from './libraries/stats';
import { setMode } from './libraries/mode';
import { setResolve } from './libraries/resolve';
import { setDevtool } from './libraries/devtool';
import { Configuration } from 'webpack';
import { setDevServer, setDevServerAfter } from './libraries/devserver';
import { setOptimization, setOptimizationAfter } from './libraries/optimization';
import { getEntry } from './libraries/entry';
import { getHtmlTemplate } from './libraries/template';

const webpackGenius = (port: number = 3000, fn?: (genius: WebpackGenius) => void): Function => {
  return (env: string): Configuration => {
    const genius = new WebpackGenius(env, port);

    genius
      .target('web')
      .entry(getEntry(genius))
      .devtool(setDevtool)
      .mode(setMode)
      .output(setOutput)
      .stats(setStats)
      .optimization(setOptimization)
      .resolve(setResolve)
      .devServer(setDevServer)
      .miniCss(genius.isBuild());

    genius
      .pluginClean((plugin) => {
        plugin.enable(genius.isBuild());
      })
      .pluginErrorOverlay((plugin) => {
        plugin.enable(genius.isHot());
      })
      .pluginHtml((plugin) => {
        const template = getHtmlTemplate();

        if (template) {
          plugin.setTemplate(template);
        }
      })
      .pluginHotModuleReplace((plugin) => {
        plugin.enable(genius.isHot());
      })
      .pluginHashedModule((plugin) => {
        plugin.enable(genius.isBuild());
      })
      .pluginReactRefresh((plugin) => {
        plugin.enable(genius.isHot());
      })
      .pluginProgressBar((plugin) => {
        plugin.enable(genius.isBuild());
      })
      .pluginPreload((plugin) => {
        plugin
          .usePrefetch()
          .enable(genius.isBuild());
      })
      .pluginAntdDayJs()
      .pluginGzip((plugin) => {
        // You can reopen it by `plugin.enable(genius.isBuild());`
        plugin.enable(false);
      });

    genius
      .ruleTsx((rule) => {
        rule.enable(genius.hasPackage('typescript'));
      })
      .ruleJsx()
      .ruleCss()
      .ruleCssNodeModules()
      .ruleScss()
      .ruleLess()
      .ruleStylus()
      .ruleAntd((rule) => {
        rule.enable(['antd', 'antd-mobile'].some((item) => genius.hasPackage(item)));
      })
      .ruleAsset()
      .ruleHtml()
      .ruleJson5();

    fn?.(genius);

    genius.optimization(setOptimizationAfter.bind(global, genius.getUglifyConfig()));
    genius.devServer(setDevServerAfter);

    // @ts-ignore
    return genius.collect();
  };
};

export default webpackGenius;
