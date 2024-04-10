import * as React from 'react';
import './index.less';
import testImg from './test.png';
import { observer } from 'mobx-react-lite';
import { useStores } from './store';

const App: React.FC = () => {
  const { articles } = useStores();

  console.log(articles);

  return (
    <div className="app">
      hello word！
      <img src={testImg}></img>
    </div>
  );
};

export default observer(App);
