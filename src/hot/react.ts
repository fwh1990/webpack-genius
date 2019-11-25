import { hot as Hot } from 'react-hot-loader/root';

let HotReact = ({ children }) => {
  return children;
};

if (module.hot) {
  const { hot } = require('react-hot-loader/root') as { hot: typeof Hot };
  HotReact = hot(HotReact);
}

export default HotReact;
