# Installation
```bash
yarn add webpack-genius --dev
```

# Features
* Transform all kind of extensions
* Use css-modules for style
* Inject React-Hot-Loader automatically
* Faster rebuild

# Demo
[React Hooks](https://github.com/redux-model/demo-react-hooks)

# Usage
Create file `webpack.config.ts`
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
