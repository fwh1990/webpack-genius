# 安装

```bash
yarn add webpack-genius --dev
```

# 特性
* 支持所有常用文件后缀
* 超快的开发热更新
* 智能配置，外加TS提示

# 案例
[React Hooks](https://github.com/redux-model/demo-react-hooks)

# 使用方法
创建文件 `webpack.config.ts`。注意不是 `.js` 后缀
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000);
```

然后把下面的指令加入到文件 `package.json`
```json
{
    "scripts": {
        "start": "webpack-genius start",
        "build": "webpack-genius build --env production"
    }
}
```

### 入口文件
框架会优先使用 `package.json`中的 `main` 字段作为入口文件，如果没有这个字段或者文件不存在，框架会接着自动查找文件 `index`, `Index`, `src/index`, `src/Index`，只要他们携带 `.js`, `.ts`, `.jsx`, `.tsx` 中的任意一个后缀就算找到。

当然了，您也可以手动指定
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius.entry('./src/entries/index.tsx');
});
```


### 域名
默认使用IP `0.0.0.0`，这样本机和局域网都能访问到您的项目。

您也可以使用域名
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius
        .entry('...')
        .devServer((server) => {
            server.host = '自定义域名或者IP';
        });
});
```

### 指定 `index.html`
框架会自动找这些文件 `index`, `public/index`, `src/index`, `src/public/index`, `assets/index`, `src/assets/index`， 只要它们携带 `.html` `.htm` 中的任意一种格式就算找到。

当然了，您也可以手动指定
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius
        .entry('...')
        .pluginHtml((plugin) => {
            plugin.setTemplate('./src/entries/index.html');
        });
});
```

### Css Modules
强烈推荐各位使用 `css-modules` 特性，有了它，我们不再需要关心样式是否会被污染或者覆盖了。

当然了，您也可以关掉它
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius
        .disableCssModules();
});
```
