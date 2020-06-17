import React, { PureComponent, lazy, Suspense } from 'react';
import ReactDom from 'react-dom';
import styles from './index.scss';

const Chunk = lazy(() => import('./chunk'));

class Demo extends PureComponent {
  render() {
    return (
      <>
        <div className={styles.wrapper}>Hello World</div>
        <Suspense fallback={null}>
          <Chunk />
        </Suspense>
      </>
    );
  }
}

ReactDom.render(<Demo />, document.getElementById('root'));
