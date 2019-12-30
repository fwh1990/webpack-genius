# Installation

**For chinese developers:** you'd better add taobao mirror before everything start. Or you may fail to install.
```bash
yarn config set registry http://registry.npm.taobao.org
yarn config set sass_binary_site http://npm.taobao.org/mirrors/node-sass
```

**For all developers:**

```bash
yarn add webpack-genius --dev
```

# Features
* Transform all kinds of extensions
* Hot-Reload for your project (Not refresh)
* High performance

# Demo
[React Hooks](https://github.com/redux-model/demo-react-hooks)

# Usage
Create file `webpack.config.ts`. Not `.js`
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000);
```

Add cli to you `package.json`
```json
{
    "scripts": {
        "start": "webpack-genius start",
        "build": "webpack-genius build --env production"
    }
}
```

### Change Entry
Genius will search entry file automatically from `index`, `Index`, `src/index`, `src/Index` with one of this extensions `.js`, `.ts`, `.jsx`, `.tsx`

Or you can override entry file:
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius.entry('./src/entries/index.tsx');
});
```


### Change Host
The default host is `0.0.0.0`, you may keep this IP address usually.
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius
        .entry('...')
        .devServer((server) => {
            server.host = 'YOUR HOST OR IP';
        });
});
```

### Point `index.html` to your own template
Genius will search entry file automatically from `index`, `public/index`, `src/index`, `src/public/index`, `assets/index`, `src/assets/index` with one of this extensions `.html` `.htm`

Or you can override html file:
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

### Disable css-modules
I recommend everybody use `css-modules` feature, but you can disable it if you don't like:
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius
        .disableCssModules();
});
```
