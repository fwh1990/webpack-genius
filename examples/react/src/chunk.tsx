import { PureComponent } from 'react';
import styles from './chunk.less';

class Chunk extends PureComponent {
  render() {
    return <div className={styles.wrapper}>async chunks</div>;
  }
}

export default Chunk;
