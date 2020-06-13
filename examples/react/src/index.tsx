import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';

class Demo extends PureComponent {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDom.render(<Demo />, document.getElementById('root'));
