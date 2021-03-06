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
import { findConfig } from 'browserslist/node';

const webpackGenius = (port: number = 3000, fn?: (genius: WebpackGenius) => void): Function => {
  return (env: { development?: boolean, production?: boolean }): Configuration => {
    const genius = new WebpackGenius(env.production ? 'production' : 'development', port);

    genius
      .target(findConfig(process.cwd()) ? 'browserlists' : 'web')
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
      .pluginReactRefresh((plugin) => {
        plugin.enable(genius.isHot());
      })
      .pluginProgressBar((plugin) => {
        plugin.enable(genius.isBuild());
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
      .ruleAntd((rule) => {
        rule.enable(['antd', 'antd-mobile'].some((item) => genius.hasPackage(item)));
      })
      .ruleAsset()
      .ruleHtml()
      .ruleJson5();

    fn?.(genius);

    genius.optimization(setOptimizationAfter.bind(global, genius.getUglifyConfig()));
    genius.devServer(setDevServerAfter);

    return genius.collect();
  };
};

export default webpackGenius;
