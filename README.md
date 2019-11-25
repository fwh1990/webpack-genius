# Installation
```bash
yarn add core-js
yarn add webpack-genius --dev
```

# Cli
```bash
# Start project
webpack-genius start

# Build code
webpack-genius build --env production
webpack-genius build --env development
```

# Usage
Create file `webpack.config.ts`
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius();
```

Add HotComponent to entry file
```jsx harmony
import HotReact from 'webpack-genius/hot/react';

ReactDOM.render(
    <HotReact>
        <App />
    </HotReact>,
    document.body
);
```

### With Port
The default port is `3000`, feel free to modify port by yourself.
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(5100);
```

### With Host
The default host is `0.0.0.0`, you may keep this IP address usually.
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius.devServer((config) => {
        config.host = 'YOUR HOST OR IP';
    });
});
```

### With Entry
The default entry is from `package.json`
```json
{
  "main": "./src/entries/Index.jsx"
}
```
Or you can set entry file in config:
```typescript
import webpackGenius from 'webpack-genius';

export default webpackGenius(3000, (genius) => {
    genius.entry('./src/entries/Index.tsx');
});
```
