import React from 'react';
import styles from './chunk.less';

class Chunk extends React.PureComponent {
  render() {
    return <div className={styles.wrapper}>async chunks</div>;
  }
}

export default Chunk;
