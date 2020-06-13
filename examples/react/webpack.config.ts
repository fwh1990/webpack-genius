import path from 'path';
import webpackGenius from '../../src';


export default webpackGenius(Number(process.env.PORT || 5000), (genius) => {
  genius
    .output((output) => {
      output.path = path.join(__dirname.replace('examples', 'snapshots'), genius.getEnvironment());
    })
    .optimization((optimization) => {
      optimization.minimize = genius.getEnvironment() === 'production';
    });
});
