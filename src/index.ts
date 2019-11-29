import './module';
import { WebpackGenius } from "./WebpackGenius";
import { setOutput } from "./libraries/output";
import { setStats } from './libraries/stats';
import { setMode } from './libraries/mode';
import { setResolve } from './libraries/resolve';
import { setDevtool } from './libraries/devtool';
import { Configuration } from 'webpack';
import { setDevServer } from './libraries/devserver';
import { setOptimization } from './libraries/optimization';

const webpackGenius = (port: number = 3000, fn?: (genius: WebpackGenius) => void): Function => {
  return (env: string): Configuration => {
    const genius = new WebpackGenius(env, port);

    genius
      .target('web')
      .entry(genius.getPackageField('main') ?? [])
      .devtool(setDevtool)
      .mode(setMode)
      .output(setOutput)
      .stats(setStats)
      .optimization(setOptimization)
      .resolve(setResolve)
      .devServer(setDevServer)
      .miniCss(genius.isBuild())
      .pluginClean()
      .pluginHtml()
      .pluginHotModuleReplace((plugin) => {
        plugin.enable(genius.isHot());
      })
      .pluginHashedModule((plugin) => {
        plugin.enable(genius.isBuild());
      })
      .ruleTsx((rule) => {
        rule.enable(genius.hasPackage('typescript'));
      })
      .ruleJsx((rule) => {
        rule.enable(genius.hasPackage('react'));
      })
      .ruleCss()
      .ruleScss()
      .ruleLess()
      .ruleAntd((rule) => {
        rule.enable(genius.hasPackage('antd'));
      })
      .ruleAliasReactDom((rule) => {
        rule.enable(genius.hasPackage('react-dom') && genius.isHot());
      })
      .ruleAsset()
      .ruleHtml();

    fn?.(genius);

    return genius.collect();
  };
};

export default webpackGenius;
