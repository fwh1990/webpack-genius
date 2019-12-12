import './misc/module';
import { WebpackGenius } from "./WebpackGenius";
import { setOutput } from "./libraries/output";
import { setStats } from './libraries/stats';
import { setMode } from './libraries/mode';
import { setResolve } from './libraries/resolve';
import { setDevtool } from './libraries/devtool';
import { Configuration } from 'webpack';
import { setDevServer } from './libraries/devserver';
import { setOptimization } from './libraries/optimization';
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
      .miniCss(genius.isBuild())
      .pluginClean((plugin) => {
        plugin.enable(genius.isBuild());
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
      .ruleAliasReactDom((rule) => {
        rule.enable(genius.hasPackage('react-dom') && genius.isHot());
      })
      .ruleAsset()
      .ruleHtml()
      .ruleMarkdown()
      .ruleJson5();

    fn?.(genius);

    return genius.collect();
  };
};

export default webpackGenius;
