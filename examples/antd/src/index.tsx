import { PureComponent } from 'react';
import ReactDom from 'react-dom';
import { Button, Tag } from 'antd';

class Demo extends PureComponent {
  render() {
    return (
      <>
        <div>Hello World</div>
        <Button>Button</Button>
        <Tag>Tags</Tag>
      </>
    );
  }
}

ReactDom.render(<Demo />, document.getElementById('root'));
